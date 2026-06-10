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

  public hypeBalance: WritableSignal<string | null> = signal(null);
  public qoneBalance: WritableSignal<string | null> = signal(null);

  // Read-only provider for balance reads (fast + stable)
  private readonly rpcProvider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
  private balancesInFlight = new Map<string, Promise<void>>();

  private appKit: AppKit | null = null;
  private browserProvider: BrowserProvider | null = null;
  private customNetwork: any;
  private listenedProvider: any = null;

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

  constructor() {
    this.initAppKit();
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

    // Subscribe to account changes
    this.appKit.subscribeAccount(async (state) => {
      this.log('AppKit subscribeAccount:', state);
      if (state.isConnected && state.address) {
        // Try to get all accounts from the provider directly
        try {
          const provider = this.appKit?.getWalletProvider() as any;
          if (provider?.request) {
            const allAccounts = await provider.request({ method: 'eth_accounts' });
            this.log('AppKit eth_accounts:', allAccounts);
            if (Array.isArray(allAccounts) && allAccounts.length > 0) {
              this.handleAccountsChanged(allAccounts);
              return;
            }
          }
        } catch (e) {
          this.err('Failed to fetch all accounts from provider:', e);
        }
        
        // Fallback to the single address from state
        this.handleAccountsChanged([state.address]);
      } else {
        // AppKit can briefly report disconnected during network switches or txs.
        // Confirm with the wallet before clearing the local session.
        const stillConnected = await this.verifyProviderAccounts();
        if (!stillConnected) {
          this.handleAccountsChanged([]);
        }
      }
    });

    // Subscribe to provider changes
    this.appKit.subscribeProviders((state: any) => {
      this.log('AppKit subscribeProviders:', state);
      // AppKit v1.x usually returns providers indexed by namespace, e.g. state['eip155']
      const provider = state?.['eip155'] || state?.provider;
      if (provider) {
        this.browserProvider = new BrowserProvider(provider as any);
        this.attachProviderListeners(provider);
      } else if (!this.currentAccount()) {
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
    if (this.appKit) {
      await this.ensureCorrectNetwork();
    }

    if (!this.browserProvider) {
      // 1. Try to fetch from AppKit directly
      const rawProvider = this.appKit?.getWalletProvider();
      if (rawProvider) {
        this.log('getSigner: recovered provider from AppKit');
        this.browserProvider = new BrowserProvider(rawProvider as any);
      } 
      // 2. Fallback to injected window.ethereum
      else if ((window as any).ethereum) {
        this.log('getSigner: fallback to window.ethereum');
        this.browserProvider = new BrowserProvider((window as any).ethereum as any);
      }
    }

    if (!this.browserProvider) throw new Error('No provider available');

    const target = address || this.currentAccount();
    this.log('getSigner: target =', target);

    return target ? this.browserProvider.getSigner(target) : this.browserProvider.getSigner();
  }

  public async ensureCorrectNetwork() {
    if (!this.appKit) return;
    
    // AppKit returns chainId which might be number or string or CAIP-2
    const isConnected = this.currentAccount() !== null;
    const currentNetwork = isConnected ? this.appKit.getChainId() : null;
    const targetChainId = Number(environment.networkDetails.chainId);
    
    // Handle CAIP-2 chainId (e.g. eip155:999)
    let currentId: number | null = null;

    if (this.browserProvider) {
      const net = await this.browserProvider.getNetwork();
      currentId = Number(net.chainId);
      this.log('ensureCorrectNetwork: from browserProvider currentId =', currentId);
    } else if (currentNetwork) {
      if (typeof currentNetwork === 'number') {
        currentId = currentNetwork;
      } else if (typeof currentNetwork === 'string') {
        if (currentNetwork.includes(':')) {
          currentId = Number(currentNetwork.split(':')[1]);
        } else {
          currentId = Number(currentNetwork);
        }
      }
      this.log('ensureCorrectNetwork: from AppKit currentId =', currentId);
    }

    this.log('ensureCorrectNetwork: currentId =', currentId, 'targetChainId =', targetChainId);

    if (currentId && currentId !== targetChainId) {
      this.log(`ensureCorrectNetwork: switching from ${currentId} to ${targetChainId}`);
      try {
        await this.appKit.switchNetwork(this.customNetwork);
      } catch (e) {
        this.err('ensureCorrectNetwork: failed to switch network:', e);
      }
    }
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
      // If multiple providers are injected, try to find MetaMask
      let provider = ethereum;
      if (ethereum.providers) {
        provider = ethereum.providers.find((p: any) => p.isMetaMask) || ethereum;
      }

      this.log('connectMetaMask: requesting accounts');
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      
      this.log('connectMetaMask: accounts received:', accounts);
      if (accounts && accounts.length > 0) {
        this.browserProvider = new BrowserProvider(provider as any);
        this.attachProviderListeners(provider);
        await this.handleAccountsChanged(accounts);
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

    provider.on('disconnect', () => {
      this.log('provider disconnect event');
      void this.verifyProviderAccounts().then((stillConnected) => {
        if (!stillConnected) {
          void this.handleAccountsChanged([]);
        }
      });
    });
  }

  private async verifyProviderAccounts(): Promise<boolean> {
    const appKitProvider = this.appKit?.getWalletProvider() as any;
    if (appKitProvider?.request) {
      try {
        const accounts = await appKitProvider.request({ method: 'eth_accounts' });
        if (Array.isArray(accounts) && accounts.length > 0) {
          this.browserProvider = new BrowserProvider(appKitProvider);
          this.attachProviderListeners(appKitProvider);
          await this.handleAccountsChanged(accounts);
          return true;
        }
      } catch (e) {
        this.err('verifyProviderAccounts: AppKit provider check failed:', e);
      }
    }

    const metamask = this.getMetaMaskProvider();
    if (metamask?.request) {
      try {
        const accounts = await metamask.request({ method: 'eth_accounts' });
        if (Array.isArray(accounts) && accounts.length > 0) {
          this.browserProvider = new BrowserProvider(metamask);
          this.attachProviderListeners(metamask);
          await this.handleAccountsChanged(accounts);
          return true;
        }
      } catch (e) {
        this.err('verifyProviderAccounts: MetaMask provider check failed:', e);
      }
    }

    return false;
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

    // Disconnected
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

  
  private getMetaMaskProvider(): any | null {
    const ethereum = (window as any).ethereum;
  
    if (!ethereum) return null;
  
    if (ethereum.providers?.length) {
      return ethereum.providers.find((p: any) => p.isMetaMask) || null;
    }
  
    return ethereum.isMetaMask ? ethereum : null;
  }

  public async disconnectWallet() {
    this.log('disconnectWallet: begin');

    if (this.appKit) {
      try {
        await this.appKit.disconnect();
      } catch (e) {
        this.err('disconnectWallet: AppKit disconnect error:', e);
      }
    }

    const provider = this.getMetaMaskProvider();
    if (provider?.request) {
      try {
        await provider.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        });
        this.log('disconnectWallet: MetaMask eth_accounts permission revoked');
      } catch (e: any) {
        this.warn('disconnectWallet: wallet_revokePermissions failed:', e);
      }
    }
    this.currentAccount.set(null);
    this.accounts.set([]);
    this.browserProvider = null;
    this.listenedProvider = null;
    this.resetBalances();
    this.log('disconnectWallet: done');
  }

  public switchAccount(address: string) {
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
