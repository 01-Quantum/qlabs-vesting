// wallet.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  formatEther,
  formatUnits,
} from 'ethers';
import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import type { AppKit } from '@reown/appkit';
import { environment } from '../../environments/environment';
import { mainnet } from '@reown/appkit/networks';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

@Injectable({ providedIn: 'root' })
export class WalletService {
  public currentAccount: WritableSignal<string | null> = signal(null);
  public accounts: WritableSignal<string[]> = signal([]);
  public isConnecting: WritableSignal<boolean> = signal(false);
  public error: WritableSignal<string | null> = signal(null);
  /**
   * True whenever we believe a wallet session may exist (injected or AppKit).
   * Drives the header's Disconnect button so users can always recover, even
   * if `accounts` got cleared while the underlying provider is still alive.
   */
  public hasSession: WritableSignal<boolean> = signal(false);

  public hypeBalance: WritableSignal<string | null> = signal(null);
  public qoneBalance: WritableSignal<string | null> = signal(null);

  // Read-only provider for balance reads (fast + stable)
  private readonly rpcProvider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
  private balancesInFlight = new Map<string, Promise<void>>();

  private appKit: AppKit | null = null;
  private browserProvider: BrowserProvider | null = null;
  private customNetwork: any;
  private listenedProvider: any = null;
  /**
   * Which path produced the current connection. `null` when nothing is
   * connected. Used to ignore spurious AppKit "disconnected" emissions for
   * sessions that were actually established via the injected MetaMask path.
   */
  private connectionSource: 'appkit' | 'injected' | null = null;

  private setConnectionSource(source: 'appkit' | 'injected' | null): void {
    this.connectionSource = source;
    this.hasSession.set(source !== null);
  }

  // ---- Logging helpers ----
  private log(...args: any[]) {
    console.log(`[WalletService ${new Date().toISOString()}]`, ...args);
  }
  private warn(...args: any[]) {
    console.warn(`[WalletService ${new Date().toISOString()}]`, ...args);
  }
  private err(...args: any[]) {
    console.error(`[WalletService ${new Date().toISOString()}]`, ...args);
  }

  /**
   * Resolves after the initial session restore attempt completes. Guards
   * (e.g. wallet-connected route guard) `await` this before checking
   * `hasSession()` so they don't redirect during the brief window between
   * app boot and `eth_accounts` returning the prior MetaMask authorization.
   */
  public readonly ready: Promise<void>;

  constructor() {
    this.initAppKit();
    this.ready = this.restoreInjectedSession();
  }

  /**
   * On page reload `connectMetaMask` history is lost (we don't go through
   * AppKit's persistence), but the MetaMask extension may still remember the
   * dApp from a prior session. `eth_accounts` returns the authorized accounts
   * without prompting, so we can re-emit them and rehydrate `currentAccount`.
   */
  private async restoreInjectedSession(): Promise<void> {
    const ethereum = (window as any).ethereum;
    if (!ethereum?.request) return;

    try {
      let provider = ethereum;
      if (Array.isArray(ethereum.providers) && ethereum.providers.length) {
        provider = ethereum.providers.find((p: any) => p.isMetaMask) || ethereum;
      }

      const accounts: string[] = await provider.request({ method: 'eth_accounts' });
      this.log('restoreInjectedSession: eth_accounts =', accounts);

      if (accounts?.length > 0) {
        this.setConnectionSource('injected');
        this.browserProvider = new BrowserProvider(provider as any);
        this.attachProviderListeners(provider);
        await this.handleAccountsChanged(accounts);
        await this.ensureCorrectNetworkOnConnect('restoreInjectedSession');
      }
    } catch (e) {
      this.warn('restoreInjectedSession: failed', e);
    }
  }

  private initAppKit() {
    this.log('initAppKit: begin');

    this.customNetwork = {
      id: Number(environment.networkDetails.chainId),
      name: environment.networkDetails.chainName,
      nativeCurrency: environment.networkDetails.nativeCurrency,
      rpcUrls: {
        default: { http: [environment.networkDetails.rpcUrls[0]] }
      },
      blockExplorers: {
        default: { name: 'Explorer', url: environment.networkDetails.blockExplorerUrls[0] }
      }
    };

    this.appKit = createAppKit({
      adapters: [new EthersAdapter()],
      networks: [this.customNetwork, mainnet],
      projectId: environment.walletConnectProjectId,
      allWallets: 'SHOW',
      features: {
        email: false,
        socials: false,
      }
    });

    this.appKit.subscribeAccount(async (state) => {
      this.log('AppKit subscribeAccount:', state);
      if (state.isConnected && state.address) {
        this.setConnectionSource('appkit');
        const provider = this.appKit?.getWalletProvider() as any;
        if (provider) {
          this.browserProvider = new BrowserProvider(provider as any);
          this.attachProviderListeners(provider);
        }

        try {
          if (provider?.request) {
            const allAccounts = await provider.request({ method: 'eth_accounts' });
            this.log('AppKit eth_accounts:', allAccounts);
            if (Array.isArray(allAccounts) && allAccounts.length > 0) {
              await this.handleAccountsChanged(allAccounts);
              await this.ensureCorrectNetworkOnConnect('AppKit subscribeAccount');
              return;
            }
          }
        } catch (e) {
          this.err('Failed to fetch all accounts from provider:', e);
        }

        await this.handleAccountsChanged([state.address]);
        await this.ensureCorrectNetworkOnConnect('AppKit subscribeAccount');
        return;
      }

      if (this.connectionSource === 'appkit') {
        this.setConnectionSource(null);
        await this.handleAccountsChanged([]);
      } else {
        this.log('AppKit subscribeAccount: ignoring disconnect (source =', this.connectionSource, ')');
      }
    });

    this.appKit.subscribeProviders((state: any) => {
      this.log('AppKit subscribeProviders:', state);
      const provider = state?.['eip155'] || state?.provider;
      if (provider) {
        this.browserProvider = new BrowserProvider(provider as any);
        this.attachProviderListeners(provider);
      } else if (this.connectionSource !== 'injected') {
        this.browserProvider = null;
      }
    });

    this.log('initAppKit: completed');
  }

  // ----------------------------
  // Provider / Signer
  // ----------------------------

  public getBrowserProvider(): BrowserProvider | null {
    return this.browserProvider;
  }

  public async getSigner(address?: string) {
    await this.ensureCorrectNetwork();

    if (!this.browserProvider) {
      const rawProvider = this.appKit?.getWalletProvider();
      if (rawProvider) {
        this.log('getSigner: recovered provider from AppKit');
        this.browserProvider = new BrowserProvider(rawProvider as any);
      } else if ((window as any).ethereum) {
        this.log('getSigner: fallback to window.ethereum');
        const injected = this.getInjectedRequestProvider();
        if (injected) {
          this.browserProvider = new BrowserProvider(injected as any);
        }
      }
    }

    if (!this.browserProvider) throw new Error('No provider available');

    const target = address || this.currentAccount();
    this.log('getSigner: target =', target);

    return target ? this.browserProvider.getSigner(target) : this.browserProvider.getSigner();
  }

  private async ensureCorrectNetworkOnConnect(context: string): Promise<void> {
    try {
      await this.ensureCorrectNetwork();
    } catch (e: any) {
      this.warn(`${context}: ensureCorrectNetwork failed`, e);
      this.error.set(
        e?.message ?? `Please switch your wallet to ${environment.networkDetails.chainName}.`,
      );
    }
  }

  public async ensureCorrectNetwork() {
    const isConnected = this.currentAccount() !== null;
    const currentNetwork = isConnected ? this.appKit?.getChainId() : null;
    const targetChainId = Number(environment.networkDetails.chainId);

    let currentId: number | null = null;

    if (this.browserProvider) {
      const net = await this.browserProvider.getNetwork();
      currentId = Number(net.chainId);
      this.log('ensureCorrectNetwork: from browserProvider currentId =', currentId);
    } else if (currentNetwork) {
      if (typeof currentNetwork === 'number') {
        currentId = currentNetwork;
      } else if (typeof currentNetwork === 'string') {
        currentId = currentNetwork.includes(':')
          ? Number(currentNetwork.split(':')[1])
          : Number(currentNetwork);
      }
      this.log('ensureCorrectNetwork: from AppKit currentId =', currentId);
    }

    this.log('ensureCorrectNetwork: currentId =', currentId, 'targetChainId =', targetChainId);

    if (currentId && currentId !== targetChainId) {
      this.warn(
        `ensureCorrectNetwork: wallet is on ${currentId}; configured chain is ${targetChainId}; attempting switch`,
      );
      await this.switchToConfiguredNetwork();
    }
  }

  /**
   * Prompt the wallet to switch to `environment.networkDetails`. Uses
   * EIP-3326 `wallet_switchEthereumChain` and, when the chain is unknown to
   * the wallet (MetaMask error 4902), falls back to EIP-3085
   * `wallet_addEthereumChain`.
   */
  public async switchToConfiguredNetwork(): Promise<void> {
    const target = environment.networkDetails;
    const chainIdHex = normalizeChainIdHex(target.chainId);

    const eip1193 = this.getInjectedRequestProvider();
    if (!eip1193) {
      throw new Error(
        `Wrong wallet network. Switch your wallet to ${target.chainName} (chainId ${chainIdHex}) and try again.`,
      );
    }

    try {
      this.log('switchToConfiguredNetwork: wallet_switchEthereumChain', chainIdHex);
      await eip1193.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (switchError: any) {
      const code = switchError?.code ?? switchError?.data?.originalError?.code;
      this.warn('switchToConfiguredNetwork: switch failed', code, switchError);
      if (code === 4902 || code === -32603) {
        this.log('switchToConfiguredNetwork: chain unknown — adding via wallet_addEthereumChain');
        try {
          await eip1193.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdHex,
                chainName: target.chainName,
                nativeCurrency: target.nativeCurrency,
                rpcUrls: target.rpcUrls,
                blockExplorerUrls: target.blockExplorerUrls,
              },
            ],
          });
        } catch (addError: any) {
          this.err('switchToConfiguredNetwork: add failed', addError);
          throw new Error(
            `Could not add ${target.chainName} (chainId ${chainIdHex}) to your wallet: ` +
              `${addError?.message ?? 'request was rejected'}.`,
          );
        }
      } else if (code === 4001) {
        throw new Error(`Network switch was rejected. Please switch your wallet to ${target.chainName}.`);
      } else {
        throw new Error(
          `Could not switch wallet to ${target.chainName} (chainId ${chainIdHex}): ` +
            `${switchError?.message ?? 'request failed'}.`,
        );
      }
    }

    this.browserProvider = new BrowserProvider(eip1193 as any);
  }

  private getInjectedRequestProvider(): { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } | null {
    if (this.connectionSource === 'appkit') {
      const appkitProvider = this.appKit?.getWalletProvider() as any;
      if (appkitProvider?.request) return appkitProvider;
    }

    const ethereum = (window as any).ethereum;
    if (!ethereum?.request) return null;

    if (Array.isArray(ethereum.providers) && ethereum.providers.length) {
      const mm = ethereum.providers.find((p: any) => p.isMetaMask);
      if (mm?.request) return mm;
    }

    return ethereum;
  }

  // ----------------------------
  // Connect entry point
  // ----------------------------

  public async connectWallet() {
    this.log('connectWallet: opening AppKit');
    this.isConnecting.set(true);
    this.error.set(null);

    try {
      if (this.appKit) {
        await this.appKit.open();
      }
    } catch (e: any) {
      this.err('connectWallet: error:', e);
      this.error.set(e?.message || 'Failed to open connection modal');
    } finally {
      this.isConnecting.set(false);
      this.log('connectWallet: done, isConnecting=false');
    }
  }

  public async connectMetaMask() {
    this.log('connectMetaMask: begin');
    this.isConnecting.set(true);
    this.error.set(null);

    const ethereum = (window as any).ethereum;

    if (!ethereum) {
      this.warn('connectMetaMask: No injected provider found');
      this.error.set('MetaMask not found. Please install the extension.');
      this.isConnecting.set(false);
      return;
    }

    try {
      let provider = ethereum;
      if (ethereum.providers) {
        provider = ethereum.providers.find((p: any) => p.isMetaMask) || ethereum;
      }

      this.log('connectMetaMask: requesting accounts');
      const accounts = await provider.request({ method: 'eth_requestAccounts' });

      this.log('connectMetaMask: accounts received:', accounts);
      if (accounts && accounts.length > 0) {
        this.setConnectionSource('injected');
        this.browserProvider = new BrowserProvider(provider as any);
        this.attachProviderListeners(provider);
        await this.handleAccountsChanged(accounts);
        await this.ensureCorrectNetworkOnConnect('connectMetaMask');
      }
    } catch (e: any) {
      this.err('connectMetaMask: error:', e);
      if (e.code === 4001) {
        this.error.set('Connection request was rejected');
      } else {
        this.error.set(e?.message || 'Failed to connect to MetaMask');
      }
    } finally {
      this.isConnecting.set(false);
      this.log('connectMetaMask: done');
    }
  }

  // ----------------------------
  // Session + account handling
  // ----------------------------

  private attachProviderListeners(provider: any) {
    if (!provider?.on || provider === this.listenedProvider) return;

    this.listenedProvider = provider;

    provider.on('accountsChanged', (accounts: string[]) => {
      this.log('provider accountsChanged:', accounts);
      void this.handleAccountsChanged(accounts);
    });

    provider.on('chainChanged', () => {
      this.log('provider chainChanged');
      const eip1193 = this.getInjectedRequestProvider();
      if (eip1193) {
        this.browserProvider = new BrowserProvider(eip1193 as any);
      }
    });
  }

  private async handleAccountsChanged(accounts: string[]) {
    this.log('handleAccountsChanged:', accounts);

    this.accounts.set(accounts);

    if (accounts.length > 0) {
      const current = this.currentAccount();
      if (!current || !accounts.includes(current)) {
        this.log('handleAccountsChanged: selecting primary account:', accounts[0]);
        this.currentAccount.set(accounts[0]);
        await this.fetchBalances(accounts[0]);
      } else {
        this.log('handleAccountsChanged: keeping current account:', current);
        await this.fetchBalances(current);
      }
      return;
    }

    this.warn('handleAccountsChanged: disconnected (0 accounts)');
    this.currentAccount.set(null);
    this.resetBalances();
  }

  // ----------------------------
  // Balances
  // ----------------------------

  private async fetchBalances(address: string) {
    const key = address.toLowerCase();
    const existing = this.balancesInFlight.get(key);
    if (existing) {
      this.log('fetchBalances: already in flight for', key);
      return existing;
    }

    const p = (async () => {
      this.log('fetchBalances:', address);
      await Promise.all([this.fetchHypeBalance(address), this.fetchQoneBalance(address)]);
    })().finally(() => this.balancesInFlight.delete(key));

    this.balancesInFlight.set(key, p);
    return p;
  }

  private async fetchHypeBalance(address: string) {
    this.log('fetchHypeBalance: begin');
    try {
      const bal = await this.rpcProvider.getBalance(address);
      const formatted = formatEther(bal);
      this.log('fetchHypeBalance: value =', formatted);
      this.hypeBalance.set(formatted);
    } catch (e) {
      this.err('fetchHypeBalance: error:', e);
      this.hypeBalance.set(null);
    }
  }

  public async getBalances(address: string) {
    try {
      const [hypeBal, qoneBal] = await Promise.all([
        this.rpcProvider.getBalance(address),
        (async () => {
          const contract = new Contract(environment.coinAddress, ERC20_ABI, this.rpcProvider);
          const [bal, decimals] = await Promise.all([
            contract['balanceOf'](address),
            contract['decimals'](),
          ]);
          return formatUnits(bal, decimals);
        })()
      ]);
      return {
        hype: formatEther(hypeBal),
        qone: qoneBal
      };
    } catch (e) {
      this.err('getBalances: error:', e);
      return { hype: '0', qone: '0' };
    }
  }

  private async fetchQoneBalance(address: string) {
    this.log('fetchQoneBalance: begin');
    try {
      const contract = new Contract(environment.coinAddress, ERC20_ABI, this.rpcProvider);

      const [bal, decimals] = await Promise.all([
        contract['balanceOf'](address),
        contract['decimals'](),
      ]);

      const formatted = formatUnits(bal, decimals);
      this.log('fetchQoneBalance: value =', formatted);
      this.qoneBalance.set(formatted);
    } catch (e) {
      this.err('fetchQoneBalance: error:', e);
      this.qoneBalance.set(null);
    }
  }

  // ----------------------------
  // UI actions
  // ----------------------------

  public async addTokenToMetaMask() {
    this.log('addTokenToMetaMask: begin');
    const provider = this.getBrowserProvider();

    if (!provider) {
      this.warn('addTokenToMetaMask: provider not found');
      this.error.set('Wallet is not connected');
      return;
    }

    try {
      await provider.send('wallet_watchAsset', [{
        type: 'ERC20',
        options: {
          address: environment.coinAddress,
          symbol: environment.coinSymbol,
          decimals: 18,
        },
      }]);
      this.log('addTokenToMetaMask: request sent');
    } catch (e) {
      this.err('addTokenToMetaMask: error:', e);
      this.error.set('Failed to add token to wallet');
    }
  }

  public async disconnectWallet(): Promise<void> {
    this.log('disconnectWallet: begin');

    const wasInjected = this.connectionSource === 'injected';
    if (wasInjected) {
      const eip1193 = this.getInjectedRequestProvider();
      if (eip1193) {
        try {
          this.log('disconnectWallet: wallet_revokePermissions(eth_accounts)');
          await eip1193.request({
            method: 'wallet_revokePermissions',
            params: [{ eth_accounts: {} }],
          });
        } catch (e) {
          this.warn('disconnectWallet: wallet_revokePermissions unsupported or rejected:', e);
        }
      }
    }

    if (this.appKit) {
      try {
        await this.appKit.disconnect();
      } catch (e) {
        this.err('disconnectWallet: AppKit disconnect error:', e);
      }
    }

    this.setConnectionSource(null);
    this.currentAccount.set(null);
    this.accounts.set([]);
    this.browserProvider = null;
    this.listenedProvider = null;
    this.resetBalances();
    this.log('disconnectWallet: done');
  }

  public switchAccount(address: string): void {
    this.log('switchAccount:', address);
    if (this.accounts().includes(address)) {
      this.currentAccount.set(address);
      void this.fetchBalances(address);
    } else {
      this.warn('switchAccount: unknown account:', address);
    }
  }

  public async refreshBalances() {
    const current = this.currentAccount();
    this.log('refreshBalances:', current);
    if (current) await this.fetchBalances(current);
  }

  private resetBalances() {
    this.log('resetBalances');
    this.hypeBalance.set(null);
    this.qoneBalance.set(null);
  }
}

/** Convert an `0x…`/decimal chain id (string or number) to the canonical `0x` hex MetaMask expects. */
function normalizeChainIdHex(chainId: string | number): string {
  if (typeof chainId === 'number') return `0x${chainId.toString(16)}`;
  const trimmed = chainId.trim();
  if (trimmed.toLowerCase().startsWith('0x')) return trimmed.toLowerCase();
  return `0x${Number(trimmed).toString(16)}`;
}
