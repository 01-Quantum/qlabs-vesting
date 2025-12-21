// wallet.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  formatEther,
  formatUnits,
} from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { environment } from '../../environments/environment';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

interface EIP6963ProviderDetail {
  info: {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
  };
  provider: any;
}

type ProviderType = 'metamask' | 'walletconnect';


@Injectable({ providedIn: 'root' })
export class WalletService {
  public currentAccount: WritableSignal<string | null> = signal(null);
  public accounts: WritableSignal<string[]> = signal([]);
  public isConnecting: WritableSignal<boolean> = signal(false);
  public error: WritableSignal<string | null> = signal(null);

  public hypeBalance: WritableSignal<string | null> = signal(null);
  public qoneBalance: WritableSignal<string | null> = signal(null);

  public activeProviderType: WritableSignal<ProviderType | null> = signal(null);

  private walletConnectProvider: any | null = null;
  private metaMaskProvider: any | null = null;

  private readonly ACTIVE_PROVIDER_KEY = 'active_provider';

  // Read-only provider for balance reads (fast + stable)
  private readonly rpcProvider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
  private balancesInFlight = new Map<string, Promise<void>>();

  // Guards
  private isMetaMaskListenerSet = false;
  private wcConnectInFlight: Promise<void> | null = null;

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
    const savedProvider = localStorage.getItem(this.ACTIVE_PROVIDER_KEY) as ProviderType | null;
    this.log('Constructor: savedProvider =', savedProvider);

    if (savedProvider) {
      this.activeProviderType.set(savedProvider);

      // Boot-time rehydrate (no QR should appear here)
      if (savedProvider === 'metamask') {
        void this.rehydrateMetaMask();
      } else if (savedProvider === 'walletconnect') {
        void this.initWalletConnect(); // restore-only
      }
    }
  }

  // ----------------------------
  // Provider resolution
  // ----------------------------

  private getMetaMaskProvider(): any | null {
    if (typeof window === 'undefined') return null;

    if (this.metaMaskProvider) {
      this.log('getMetaMaskProvider: using cached MetaMask provider');
      return this.metaMaskProvider;
    }

    const eth = (window as any).ethereum;
    if (!eth) {
      this.warn('getMetaMaskProvider: window.ethereum not found');
      this.tryEip6963Discovery();
      return null;
    }

    // Multiple injected providers case
    if (eth.providers?.length) {
      const mm = eth.providers.find((p: any) => p.isMetaMask);
      if (mm) {
        this.metaMaskProvider = mm;
        this.log('getMetaMaskProvider: found MetaMask in ethereum.providers[]');
        return mm;
      }
    }

    if (eth.isMetaMask) {
      this.metaMaskProvider = eth;
      this.log('getMetaMaskProvider: window.ethereum is MetaMask');
      return eth;
    }

    this.warn('getMetaMaskProvider: MetaMask not detected via legacy paths; trying EIP-6963');
    this.tryEip6963Discovery();
    return null;
  }

  private tryEip6963Discovery() {
    if (typeof window === 'undefined') return;

    const onAnnounce = (event: any) => {
      const detail: EIP6963ProviderDetail = event.detail;
      this.log('EIP-6963 announceProvider:', detail?.info?.rdns, detail?.info?.name);

      if (detail?.info?.rdns === 'io.metamask') {
        this.metaMaskProvider = detail.provider;
        this.log('EIP-6963: cached MetaMask provider from announcement');
      }
    };

    window.addEventListener('eip6963:announceProvider', onAnnounce);
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    setTimeout(() => {
      window.removeEventListener('eip6963:announceProvider', onAnnounce);
      this.log('EIP-6963: discovery listener removed');
    }, 1500);
  }

  private getActiveEip1193Provider(): any | null {
    const type = this.activeProviderType();
    this.log('getActiveEip1193Provider: activeProviderType =', type);

    if (type === 'walletconnect') return this.walletConnectProvider;
    if (type === 'metamask') return this.getMetaMaskProvider();

    // Not set: best-effort MetaMask detection (no auto-connect)
    return this.getMetaMaskProvider();
  }

  public getBrowserProvider(): BrowserProvider | null {
    const p = this.getActiveEip1193Provider();
    if (!p) return null;
    return new BrowserProvider(p);
  }

  public async getSigner(address?: string) {
    const provider = this.getBrowserProvider();
    if (!provider) throw new Error('No provider available');

    const target = address || this.currentAccount();
    this.log('getSigner: target =', target);

    // Validate and switch network before returning signer
    await this.validateAndSwitchNetwork();

    return target ? provider.getSigner(target) : provider.getSigner();
  }

  /**
   * Validates the current network and attempts to switch if incorrect.
   * Called automatically before getting a signer.
   */
  private async validateAndSwitchNetwork(): Promise<void> {
    this.log('validateAndSwitchNetwork: begin');
    const provider = this.getActiveEip1193Provider();
    const type = this.activeProviderType();

    if (!provider || !type) {
      this.warn('validateAndSwitchNetwork: no active provider');
      throw new Error('No wallet connected');
    }

    try {
      const expected = Number(environment.networkDetails.chainId);
      const current = Number(provider?.chainId ?? await provider?.request?.({ method: 'eth_chainId' }));
      this.log('validateAndSwitchNetwork: chain check', { current, expected });

      if (current !== expected) {
        this.log('validateAndSwitchNetwork: wrong network, attempting to switch...');
        await this.addOrSwitchNetwork(provider);
        
        // Verify the switch was successful
        const newChainId = Number(provider?.chainId ?? await provider?.request?.({ method: 'eth_chainId' }));
        if (newChainId !== expected) {
          throw new Error(`Please switch to ${environment.networkDetails.chainName} in your wallet`);
        }
        
        this.log('validateAndSwitchNetwork: successfully switched to correct network');
      } else {
        this.log('validateAndSwitchNetwork: already on correct network');
      }
    } catch (e: any) {
      this.err('validateAndSwitchNetwork: error:', e);
      throw new Error(e?.message || `Please switch to ${environment.networkDetails.chainName}`);
    }
  }

  // ----------------------------
  // WalletConnect
  // ----------------------------

  /**
   * Restore-only init:
   * - initializes provider + listeners
   * - restores accounts if a session already exists
   * - DOES NOT call connect() => no QR on reload
   */
  public async initWalletConnect(): Promise<boolean> {
    this.log('initWalletConnect: begin');

    if (!this.walletConnectProvider) {
      this.log('initWalletConnect: creating EthereumProvider.init(...)');
      this.walletConnectProvider = await EthereumProvider.init({
        projectId: environment.walletConnectProjectId,
        chains: [Number(environment.networkDetails.chainId)],
        showQrModal: true, // QR shows only when connect() is called
        qrModalOptions: { themeMode: 'dark' },
        rpcMap: {
          [Number(environment.networkDetails.chainId)]: environment.networkDetails.rpcUrls[0],
        },
      });

      // ---- Listeners ----

      this.walletConnectProvider.on('display_uri', (uri: string) => {
        this.log('WalletConnect display_uri:', uri);
      });

      // LOG ONLY: do not set session / switch network here (avoids race + black modal)
      this.walletConnectProvider.on('connect', (info: any) => {
        this.log('WalletConnect connect event:', info);
        this.log('WalletConnect session now:', this.walletConnectProvider?.session);
        this.log('WalletConnect accounts now:', this.walletConnectProvider?.accounts);
        this.validateChainOrSetError(this.walletConnectProvider, 'WalletConnect');
      });

      // Keep state synced. Also close modal if it stayed open.
      this.walletConnectProvider.on('accountsChanged', (accounts: string[]) => {
        this.log('WalletConnect accountsChanged:', accounts);

        if (accounts?.length > 0) {
          this.closeWcModal('accountsChanged');
        }

        void this.handleAccountsChanged(accounts);
      });

      this.walletConnectProvider.on('chainChanged', (chainId: any) => {
        this.log('WalletConnect chainChanged:', chainId);
      });

      this.walletConnectProvider.on('disconnect', (reason: any) => {
        this.warn('WalletConnect disconnect event:', reason);
        void this.handleAccountsChanged([]);
      });

      this.log('initWalletConnect: listeners attached');
    } else {
      this.log('initWalletConnect: provider already exists');
    }

    // Attempt restore
    const accounts = this.walletConnectProvider.accounts ?? [];
    const hasSession = !!this.walletConnectProvider?.session;
    this.log('initWalletConnect: restored', { hasSession, accounts });

    if (accounts.length > 0) {
      await this.setActiveSession('walletconnect', accounts);
      await this.validateChainOrSetError(this.walletConnectProvider, 'WalletConnect');
      return true;
    }
    return false;
  }

  /**
   * User-action connect:
   * - shows QR via connect()
   * - session is owned by THIS function only
   */
  public async connectWalletConnect() {
    this.log('connectWalletConnect: begin');

    if (this.wcConnectInFlight) {
      this.warn('connectWalletConnect: already in flight, returning existing promise');
      return this.wcConnectInFlight;
    }

    this.wcConnectInFlight = (async () => {
      if (!this.walletConnectProvider) {
        this.log('connectWalletConnect: provider missing, calling initWalletConnect()');
        await this.initWalletConnect();
      }

      // IMPORTANT: session can exist even when accounts are briefly empty during async rehydrate
      const hasSession = !!this.walletConnectProvider?.session;
      const accounts = this.walletConnectProvider?.accounts ?? [];

      this.log('connectWalletConnect: pre-check', { hasSession, accounts });

      if (hasSession || accounts.length > 0) {
        this.log('connectWalletConnect: already connected/restored, skipping connect()');
        if (accounts.length > 0) {
          await this.setActiveSession('walletconnect', accounts);
        }
        // Close modal if it appears in a weird state
        this.closeWcModal('pre-check');
        return;
      }

      try {
        this.log('connectWalletConnect: calling provider.connect() => QR may appear');
        await this.walletConnectProvider.connect();

        const newAccounts = this.walletConnectProvider?.accounts ?? [];
        this.log('connectWalletConnect: post-connect accounts =', newAccounts);

        if (newAccounts.length > 0) {
          await this.setActiveSession('walletconnect', newAccounts);
          this.closeWcModal('post-connect');
          
        } else {
          this.warn('connectWalletConnect: connect() finished but accounts still empty');
        }
      } catch (e: any) {
        this.err('connectWalletConnect: error:', e);

        // Treat these as cancel/close/reset: DO NOT retry
        const msg = String(e?.message ?? '');
        const code = e?.code;
        const cancelled =
          code === 4001 ||
          /reset/i.test(msg) ||
          /rejected/i.test(msg) ||
          /closed/i.test(msg) ||
          /canceled|cancelled/i.test(msg);

        if (cancelled) {
          this.warn('connectWalletConnect: cancelled/reset/closed => not retrying');
          return;
        }

        throw e;
      }
    })().finally(() => {
      this.wcConnectInFlight = null;
      this.log('connectWalletConnect: end (inFlight cleared)');
    });

    return this.wcConnectInFlight;
  }

  public async getWalletConnectProvider() {
    if (!this.walletConnectProvider) await this.initWalletConnect();
    return this.walletConnectProvider;
  }

  // ----------------------------
  // MetaMask
  // ----------------------------

  private async rehydrateMetaMask() {
    this.log('rehydrateMetaMask: begin');
    const provider = this.getMetaMaskProvider();

    if (!provider) {
      this.warn('rehydrateMetaMask: MetaMask provider not found');
      return;
    }

    this.listenForMetaMaskAccountChanges();

    try {
      const browserProvider = new BrowserProvider(provider);
      const accounts = await browserProvider.listAccounts();
      const addresses = accounts.map((a) => a.address);
      this.log('rehydrateMetaMask: listAccounts =', addresses);

      if (addresses.length > 0) {
        await this.setActiveSession('metamask', addresses);
        await this.validateChainOrSetError(provider, 'MetaMask');
      } else {
        this.log('rehydrateMetaMask: no connected accounts');
      }
    } catch (e) {
      this.err('rehydrateMetaMask: error:', e);
    }
  }

  private listenForMetaMaskAccountChanges() {
    if (this.isMetaMaskListenerSet) {
      this.log('listenForMetaMaskAccountChanges: already set');
      return;
    }

    const provider = this.getMetaMaskProvider();
    if (!provider) {
      this.warn('listenForMetaMaskAccountChanges: provider missing');
      return;
    }

    provider.on('accountsChanged', (accounts: string[]) => {
      this.log('MetaMask accountsChanged:', accounts);
      void this.handleAccountsChanged(accounts);
    });

    provider.on('chainChanged', (chainId: string) => {
      this.log('MetaMask chainChanged:', chainId);
    });

    this.isMetaMaskListenerSet = true;
    this.log('listenForMetaMaskAccountChanges: listener attached');
  }

  // ----------------------------
  // Connect entry point
  // ----------------------------

  public async connectWallet(type: ProviderType) {
    this.log('connectWallet:', { type });
    this.isConnecting.set(true);
    this.error.set(null);

    try {
      if (type === 'metamask') {
        const mm = this.getMetaMaskProvider();
        if (!mm) throw new Error('MetaMask is not installed or not detected');

        this.listenForMetaMaskAccountChanges();

        this.log('MetaMask: wallet_requestPermissions...');
        await mm.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });

        this.log('MetaMask: addOrSwitchNetwork...');
        await this.addOrSwitchNetwork(mm);

        const browserProvider = new BrowserProvider(mm);
        this.log('MetaMask: eth_requestAccounts...');
        const accounts = await browserProvider.send('eth_requestAccounts', []);
        this.log('MetaMask: connected accounts:', accounts);

        await this.setActiveSession('metamask', accounts);
        await this.validateChainOrSetError(mm, 'MetaMask');
      }

      if (type === 'walletconnect') {
        await this.connectWalletConnect();
      }
    } catch (e: any) {
      this.err('connectWallet: error:', e);

      if (e?.code === 4001) {
        this.error.set('User rejected the connection request');
      } else {
        this.error.set(e?.message || `Failed to connect ${type}`);
      }

      localStorage.removeItem(this.ACTIVE_PROVIDER_KEY);
      this.activeProviderType.set(null);
    } finally {
      this.isConnecting.set(false);
      this.log('connectWallet: done, isConnecting=false');
    }
  }

  // ----------------------------
  // Session + account handling
  // ----------------------------

  private async setActiveSession(type: ProviderType, accounts: string[]) {
    this.log('setActiveSession:', { type, accounts });

    if (accounts?.length > 0) {
      this.activeProviderType.set(type);
      localStorage.setItem(this.ACTIVE_PROVIDER_KEY, type);
      await this.handleAccountsChanged(accounts);
    } else {
      this.warn('setActiveSession: empty accounts; not setting session');
    }
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
    this.activeProviderType.set(null);
    localStorage.removeItem(this.ACTIVE_PROVIDER_KEY);
    this.currentAccount.set(null);
    this.resetBalances();
  }

  // ----------------------------
  // Network helpers
  // ----------------------------

  private async addOrSwitchNetwork(provider: any) {
    this.log('addOrSwitchNetwork: target chainId =', environment.networkDetails.chainId);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: environment.networkDetails.chainId }],
      });
      this.log('addOrSwitchNetwork: switched OK');
    } catch (e: any) {
      this.warn('addOrSwitchNetwork: switch failed:', e);

      if (e?.code === 4902) {
        this.log('addOrSwitchNetwork: chain missing, adding...');
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [environment.networkDetails],
        });
        this.log('addOrSwitchNetwork: added OK');
        return;
      }

      throw new Error(e?.message || 'Failed to switch network');
    }
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

    const provider = this.getMetaMaskProvider();
    if (!provider) {
      this.warn('addTokenToMetaMask: MetaMask provider not found');
      this.error.set('MetaMask is not installed');
      return;
    }

    try {
      await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: environment.coinAddress,
            symbol: 'QLABS',
            decimals: 18,
          },
        },
      });
      this.log('addTokenToMetaMask: request sent');
    } catch (e) {
      this.err('addTokenToMetaMask: error:', e);
      this.error.set('Failed to add token to MetaMask');
    }
  }

  public async disconnectWallet() {
    this.log('disconnectWallet: begin');

    localStorage.removeItem(this.ACTIVE_PROVIDER_KEY);

    if (this.walletConnectProvider) {
      try {
        this.log('disconnectWallet: disconnecting WalletConnect session...');
        await this.walletConnectProvider.disconnect();
        this.log('disconnectWallet: WalletConnect disconnected');
      } catch (e) {
        this.err('disconnectWallet: WalletConnect disconnect error:', e);
      } finally {
        this.walletConnectProvider = null;
      }
    }

    this.activeProviderType.set(null);
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

  private async validateChainOrSetError(provider: any, label: 'MetaMask' | 'WalletConnect') {
    try {
      const expected = Number(environment.networkDetails.chainId);
      const current = Number(provider?.chainId ?? await provider?.request?.({ method: 'eth_chainId' }));
      this.log(`${label}: chain check`, { current, expected });
  
      if (current !== expected) {
        this.error.set(`Wrong network. Please switch to ${environment.networkDetails.chainName}.`);
        return false;
      }
      return true;
    } catch (e) {
      this.err(`${label}: chain check failed`, e);
      return true; // don't hard-fail
    }
  }
  private closeWcModal(reason: string) {
    const modal = (this.walletConnectProvider as any)?.modal;
    if (modal?.closeModal) {
      this.log(`WalletConnect modal: closing (${reason})`);
      modal.closeModal();
    }
  }
}
