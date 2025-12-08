import { Injectable, signal, WritableSignal } from '@angular/core';
import { BrowserProvider, Contract, formatEther, JsonRpcProvider } from 'ethers';

const TESTNET_RPC_URL = 'https://rpc.hyperliquid-testnet.xyz/evm';
const QONE_TOKEN_ADDRESS = '0xe2493Ee32Ac5094c0541014D1b7fF64E1557807d';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)'
];

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public currentAccount: WritableSignal<string | null> = signal(null);
  public isConnecting: WritableSignal<boolean> = signal(false);
  public error: WritableSignal<string | null> = signal(null);
  public hypeBalance: WritableSignal<string | null> = signal(null);
  public qoneBalance: WritableSignal<string | null> = signal(null);

  constructor() {
    this.checkIfWalletIsConnected();
    this.listenForAccountChanges();
  }

  private async checkIfWalletIsConnected() {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const provider = new BrowserProvider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0].address;
          this.currentAccount.set(address);
          this.fetchBalances(address);
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
      }
    }
  }

  private listenForAccountChanges() {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          this.currentAccount.set(accounts[0]);
          this.fetchBalances(accounts[0]);
        } else {
          this.currentAccount.set(null);
          this.resetBalances();
        }
      });
    }
  }

  public async connectWallet() {
    this.isConnecting.set(true);
    this.error.set(null);
    
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }]
        });
        
        const provider = new BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        
        if (accounts && accounts.length > 0) {
           const signer = await provider.getSigner();
           const address = await signer.getAddress();
           this.currentAccount.set(address);
           await this.fetchBalances(address);
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
      this.error.set('MetaMask is not installed');
      this.isConnecting.set(false);
    }
  }

  private async fetchBalances(address: string) {
    await Promise.all([
      this.fetchHypeBalance(address),
      this.fetchQoneBalance(address)
    ]);
  }

  private async fetchHypeBalance(address: string) {
    try {
      const provider = new JsonRpcProvider(TESTNET_RPC_URL);
      const balance = await provider.getBalance(address);
      this.hypeBalance.set(formatEther(balance));
    } catch (err) {
      console.error('Error fetching HYPE balance:', err);
      this.hypeBalance.set(null);
    }
  }

  private async fetchQoneBalance(address: string) {
    try {
      const provider = new JsonRpcProvider(TESTNET_RPC_URL);
      const contract = new Contract(QONE_TOKEN_ADDRESS, ERC20_ABI, provider);
      
      const [balance, decimals] = await Promise.all([
        contract['balanceOf'](address),
        contract['decimals']()
      ]);

      const { formatUnits } = await import('ethers');
      this.qoneBalance.set(formatUnits(balance, decimals));
    } catch (err) {
      console.error('Error fetching QONE balance:', err);
      this.qoneBalance.set(null);
    }
  }

  public async addTokenToMetaMask() {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: QONE_TOKEN_ADDRESS,
              symbol: 'QLABS',
              decimals: 18,
            },
          },
        });
      } catch (error) {
        console.error(error);
        this.error.set('Failed to add token to MetaMask');
      }
    }
  }

  public disconnectWallet() {
    this.currentAccount.set(null);
    this.resetBalances();
  }

  private resetBalances() {
    this.hypeBalance.set(null);
    this.qoneBalance.set(null);
  }
}
