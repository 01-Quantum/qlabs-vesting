import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { Contract, formatUnits, Interface } from 'ethers';
import { WalletService } from './wallet.service';
import { JsonRpcProvider, BrowserProvider } from 'ethers';

const VESTING_ADDRESS = '0x8dE5841F4f6df89FB593b9FF155f44E66ADe247D';
const TESTNET_RPC_URL = 'https://rpc.hyperliquid-testnet.xyz/evm';

const VESTING_ABI = [
  'function getClaimableAmount(address beneficiary, uint8 category) public view returns (uint256)',
  'function claim(uint8 category) external',
  'function initializeMyAllocation(uint256 totalAmount, uint8 category, bytes32[] calldata proof) external',
  'function getAllocation(address beneficiary, uint8 category) external view returns (tuple(uint256 totalAmount, uint256 claimedAmount, bool initialized))',
];

export interface CategoryClaim {
  category: number;
  name: string;
  amount: string;
}

@Injectable({
  providedIn: 'root'
})
export class VestingService {
  private walletService = inject(WalletService);
  
  public claimableAmount: WritableSignal<string | null> = signal(null);
  public claimableCategories: WritableSignal<CategoryClaim[]> = signal([]);
  public isClaiming: WritableSignal<boolean> = signal(false);
  public error: WritableSignal<string | null> = signal(null);

  private categoryNames: {[key: number]: string} = {
    0: 'Token Sale Tier 1',
    1: 'Token Sale Tier 2',
    2: 'Token Sale Tier 3',
    3: 'Team & Advisors',
    4: 'Liquidity/Treasury',
    5: 'Community Airdrops'
  };

  constructor() {}

  // We will call this when wallet connects
  public async fetchClaimableAmount(address: string) {
    try {
      const provider = new JsonRpcProvider(TESTNET_RPC_URL);
      const contract = new Contract(VESTING_ADDRESS, VESTING_ABI, provider);
      
      let totalClaimable = 0n;
      const claims: CategoryClaim[] = [];
      
      for (let i = 0; i <= 5; i++) {
        const amount = await contract['getClaimableAmount'](address, i);
        if (amount > 0n) {
          totalClaimable += amount;
          claims.push({
            category: i,
            name: this.categoryNames[i],
            amount: formatUnits(amount, 18)
          });
        }
      }

      this.claimableAmount.set(formatUnits(totalClaimable, 18));
      this.claimableCategories.set(claims);
      
    } catch (err) {
      console.error('Error fetching claimable amount:', err);
      this.claimableAmount.set(null);
      this.claimableCategories.set([]);
    }
  }

  public async claim(category: number) {
    this.isClaiming.set(true);
    this.error.set(null);

    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const provider = new BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(VESTING_ADDRESS, VESTING_ABI, signer);

        const tx = await contract['claim'](category);
        await tx.wait();
        
        // Refresh balances after claim
        const address = await signer.getAddress();
        await this.fetchClaimableAmount(address);
        
      } catch (err: any) {
        console.error('Error claiming tokens:', err);
        this.error.set(err.message || 'Failed to claim tokens');
      } finally {
        this.isClaiming.set(false);
      }
    }
  }
}
