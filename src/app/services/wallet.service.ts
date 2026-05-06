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
    this.appKit.subscribeAccount((state) => {
      this.log('AppKit subscribeAccount:', state);
      if (state.isConnected && state.address) {
        this.handleAccountsChanged([state.address]);
      } else {
        this.handleAccountsChanged([]);
      }
    });

    // Subscribe to provider changes
    this.appKit.subscribeProviders((state: any) => {
      this.log('AppKit subscribeProviders:', state);
      // AppKit v1.x usually returns providers indexed by namespace, e.g. state['eip155']
      const provider = state?.['eip155'] || state?.provider;
      if (provider) {
        this.browserProvider = new BrowserProvider(provider as any);
      } else {
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
      // Try to fetch it directly if subscription missed it
      const rawProvider = this.appKit?.getWalletProvider();
      if (rawProvider) {
        this.browserProvider = new BrowserProvider(rawProvider as any);
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
    if (typeof currentNetwork === 'number') {
      currentId = currentNetwork;
    } else if (typeof currentNetwork === 'string') {
      if (currentNetwork.includes(':')) {
        currentId = Number(currentNetwork.split(':')[1]);
      } else {
        currentId = Number(currentNetwork);
      }
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

  // ----------------------------
  // Session + account handling
  // ----------------------------

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

  public async disconnectWallet() {
    this.log('disconnectWallet: begin');

    if (this.appKit) {
      try {
        await this.appKit.disconnect();
      } catch (e) {
        this.err('disconnectWallet: AppKit disconnect error:', e);
      }
    }

    this.currentAccount.set(null);
    this.accounts.set([]);
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
