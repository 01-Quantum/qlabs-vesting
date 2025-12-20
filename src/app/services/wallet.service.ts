import { Injectable, signal, WritableSignal } from '@angular/core';
import { BrowserProvider, Contract, formatEther, JsonRpcProvider } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { environment } from '../../environments/environment';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)'
];

interface EIP6963ProviderDetail {
  info: {
    uuid: string;
    name: string;
    icon: string;
    rdns: string; // MetaMask's reverse DNS is "io.metamask"
  };
  provider: any;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public currentAccount: WritableSignal<string | null> = signal(null);
  public accounts: WritableSignal<string[]> = signal([]);
  public isConnecting: WritableSignal<boolean> = signal(false);
  public error: WritableSignal<string | null> = signal(null);
  public hypeBalance: WritableSignal<string | null> = signal(null);
  public qoneBalance: WritableSignal<string | null> = signal(null);
  
  private walletConnectProvider: any | null = null;

  constructor() {
    this.checkIfWalletIsConnected();
    this.listenForAccountChanges();
  }

  public async getWalletConnectProvider() {
    if (!this.walletConnectProvider) {
      console.log('WalletService: Initializing WalletConnect provider...');
      this.walletConnectProvider = await EthereumProvider.init({
        projectId: environment.walletConnectProjectId,
        chains: [Number(environment.networkDetails.chainId)],
        showQrModal: true,
        rpcMap: {
          [Number(environment.networkDetails.chainId)]: environment.networkDetails.rpcUrls[0]
        }
      });
      
      this.walletConnectProvider.on('accountsChanged', (accounts: string[]) => {
        console.log('WalletService: WalletConnect accountsChanged:', accounts);
        this.accounts.set(accounts);
        if (accounts.length > 0) {
           this.currentAccount.set(accounts[0]);
           this.fetchBalances(accounts[0]);
        } else {
          this.currentAccount.set(null);
          this.resetBalances();
        }
      });
      
      this.walletConnectProvider.on('chainChanged', (chainId: any) => {
        console.log('WalletService: WalletConnect chainChanged:', chainId);
        // Handle chain change if needed
      });
      
      this.walletConnectProvider.on('disconnect', () => {
        console.log('WalletService: WalletConnect disconnected');
        this.currentAccount.set(null);
        this.resetBalances();
      });
    }
    return this.walletConnectProvider;
  }

  public getBrowserProvider(): BrowserProvider | null {
    const provider = this.getMetaMaskProvider();
    if (!provider) return null;
    return new BrowserProvider(provider);
  }

  public async getSigner(address?: string) {
    const provider = this.getBrowserProvider();
    if (!provider) throw new Error('No provider available');
    
    // If address is provided, try to get signer for that specific address
    // Otherwise use current account or default
    const targetAddress = address || this.currentAccount();
    if (targetAddress) {
      return await provider.getSigner(targetAddress);
    } else {
      return await provider.getSigner();
    }
  }

  private getMetaMaskProvider(): any | null {
    // 1. Fallback for older environments or when EIP-6963 is missed
    if (typeof window === 'undefined') return null;

    let provider = null;

    // 2. Modern Discovery: Listen for EIP-6963 announcements
    const onAnnounce = (event: any) => {
      const detail: EIP6963ProviderDetail = event.detail;
      if (detail.info.rdns === "io.metamask") {
        provider = detail.provider;
      }
    };

    window.addEventListener("eip6963:announceProvider", onAnnounce);
    
    // Trigger discovery
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    
    // Cleanup listener to prevent memory leaks since we only care about the synchronous result (or immediate response)
    window.removeEventListener("eip6963:announceProvider", onAnnounce);

    // 3. Legacy Fallback (Your original logic, as a backup)
    if (!provider && (window as any).ethereum) {
      const eth = (window as any).ethereum;
      if (eth.providers) {
        provider = eth.providers.find((p: any) => p.isMetaMask);
      } else if (eth.isMetaMask) {
        provider = eth;
      }
    }

    return provider;
  }

  private async checkIfWalletIsConnected() {
    console.log('WalletService: Checking if wallet is connected...');
    const provider = this.getMetaMaskProvider();
    if (provider) {
      try {
        const browserProvider = new BrowserProvider(provider);
        const accounts = await browserProvider.listAccounts();
        console.log('WalletService: Found accounts:', accounts.map(a => a.address));
        
        if (accounts.length > 0) {
          const addresses = accounts.map(a => a.address);
          this.accounts.set(addresses);
          
          // If currentAccount is not set or not in the list, set it to the first one
          const current = this.currentAccount();
          if (!current || !addresses.includes(current)) {
             console.log('WalletService: Auto-selecting first account:', addresses[0]);
             this.currentAccount.set(addresses[0]);
             this.fetchBalances(addresses[0]);
          } else {
             console.log('WalletService: Maintaining current account:', current);
             this.fetchBalances(current);
          }
        } else {
          console.log('WalletService: No accounts found connected');
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
      }
    } else {
      console.log('WalletService: No provider found');
    }
  }

  private listenForAccountChanges() {
    const provider = this.getMetaMaskProvider();
    if (provider) {
      provider.on('accountsChanged', (accounts: string[]) => {
        console.log('WalletService: accountsChanged event:', accounts);
        this.accounts.set(accounts);
        if (accounts.length > 0) {
           // If currentAccount is not in the new list, switch to the first one
           const current = this.currentAccount();
           if (!current || !accounts.includes(current)) {
             console.log('WalletService: Switching to new primary account:', accounts[0]);
             this.currentAccount.set(accounts[0]);
             this.fetchBalances(accounts[0]);
           } else {
             console.log('WalletService: Current account still valid:', current);
           }
        } else {
          console.log('WalletService: All accounts disconnected');
          this.currentAccount.set(null);
          this.resetBalances();
        }
      });
    }
  }

  private async addOrSwitchNetwork(provider: any) {
    try {
      // 1. Try to switch to the network first
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: environment.networkDetails.chainId }],
      });
    } catch (error: any) {
      // 2. Error code 4902 indicates the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [environment.networkDetails],
          });
        } catch (addError) {
          throw new Error('User rejected adding the network');
        }
      } else {
        throw new Error('Failed to switch network');
      }
    }
  }

  public async connectWallet() {
    console.log('WalletService: connectWallet called');
    this.isConnecting.set(true);
    this.error.set(null);
    
    const metaMaskProvider = this.getMetaMaskProvider();

    if (metaMaskProvider) {
      try {
        console.log('WalletService: Requesting permissions...');
        await metaMaskProvider.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }]
        });

        console.log('WalletService: Checking network...');
        await this.addOrSwitchNetwork(metaMaskProvider);
        
        const provider = new BrowserProvider(metaMaskProvider);
        console.log('WalletService: Requesting accounts...');
        const accounts = await provider.send("eth_requestAccounts", []);
        
        console.log('WalletService: Connected accounts:', accounts);
        
        if (accounts && accounts.length > 0) {
           this.accounts.set(accounts);
           
           // Upon explicit connect, usually the user wants to use the first account or the one they just selected
           // But here we can just update the list. The signer part below was taking the first account implicitly.
           
           // We can't easily get 'signer' for a specific account from BrowserProvider unless we pass the index or address?
           // Actually getSigner() without args gets the first one.
           // Let's use the first one as default active.
           console.log('WalletService: Setting active account to:', accounts[0]);
           this.currentAccount.set(accounts[0]);
           await this.fetchBalances(accounts[0]);
        }

      } catch (err: any) {
        console.error('Error connecting wallet:', err);
        if (err.code === 4001) {
            this.error.set('User rejected the connection request');
        } else {
            this.error.set(err.message || 'Failed to connect wallet');
        }
      } finally {
        this.isConnecting.set(false);
      }
    } else {
      console.warn('WalletService: MetaMask not installed');
      this.error.set('MetaMask is not installed');
      this.isConnecting.set(false);
    }
  }

  private async fetchBalances(address: string) {
    console.log('WalletService: Fetching balances for:', address);
    await Promise.all([
      this.fetchHypeBalance(address),
      this.fetchQoneBalance(address)
    ]);
  }

  private async fetchHypeBalance(address: string) {
    console.log('WalletService: Fetching HYPE balance...');
    try {
      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const balance = await provider.getBalance(address);
      const formatted = formatEther(balance);
      console.log('WalletService: HYPE balance fetched:', formatted);
      this.hypeBalance.set(formatted);
    } catch (err) {
      console.error('Error fetching HYPE balance:', err);
      this.hypeBalance.set(null);
    }
  }

  private async fetchQoneBalance(address: string) {
    console.log('WalletService: Fetching QONE balance...');
    try {
      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const contract = new Contract(environment.coinAddress, ERC20_ABI, provider);
      
      const [balance, decimals] = await Promise.all([
        contract['balanceOf'](address),
        contract['decimals']()
      ]);

      const { formatUnits } = await import('ethers');
      const formatted = formatUnits(balance, decimals);
      console.log('WalletService: QONE balance fetched:', formatted);
      this.qoneBalance.set(formatted);
    } catch (err) {
      console.error('Error fetching QONE balance:', err);
      this.qoneBalance.set(null);
    }
  }

  public async addTokenToMetaMask() {
    console.log('WalletService: addTokenToMetaMask called');
    const provider = this.getMetaMaskProvider();
    if (provider) {
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
        console.log('WalletService: Token added to MetaMask request sent');
      } catch (error) {
        console.error('WalletService: Failed to add token:', error);
        this.error.set('Failed to add token to MetaMask');
      }
    } else {
        console.warn('WalletService: Provider not found for addTokenToMetaMask');
    }
  }

  public disconnectWallet() {
    console.log('WalletService: Disconnecting wallet...');
    this.currentAccount.set(null);
    this.accounts.set([]);
    this.resetBalances();
  }

  public switchAccount(address: string) {
    console.log('WalletService: Switching account to:', address);
    if (this.accounts().includes(address)) {
      this.currentAccount.set(address);
      this.fetchBalances(address);
    } else {
      console.warn('WalletService: Attempted to switch to unknown account:', address);
    }
  }

  public async refreshBalances() {
    const current = this.currentAccount();
    console.log('WalletService: Refreshing balances for:', current);
    if (current) {
      await this.fetchBalances(current);
    }
  }

  private resetBalances() {
    console.log('WalletService: Resetting balances');
    this.hypeBalance.set(null);
    this.qoneBalance.set(null);
  }
}
