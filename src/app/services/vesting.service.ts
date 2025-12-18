import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { Contract, formatUnits, Interface } from 'ethers';
import { WalletService } from './wallet.service';
import { JsonRpcProvider, BrowserProvider } from 'ethers';
import { environment } from '../../environments/environment';

const VESTING_ABI = [
  'function getClaimableAmount(address beneficiary, uint8 category) public view returns (uint256)',
  'function claim(uint8 category) external',
  'function initializeMyAllocation(uint256 totalAmount, uint8 category, bytes32[] calldata proof) external',
  'function getAllocation(address beneficiary, uint8 category) external view returns (tuple(uint256 totalAmount, uint256 claimedAmount, bool initialized))',
  'function tgeTimestamp() external view returns (uint256)',
  'function totalAllocated() external view returns (uint256)',
  'function totalClaimed() external view returns (uint256)'
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
  public isInitializing: WritableSignal<boolean> = signal(false);
  public initializationNeeded: WritableSignal<boolean> = signal(false);
  public error: WritableSignal<string | null> = signal(null);

  // User Stats
  public userAllocations: WritableSignal<CategoryClaim[]> = signal([]);

  // Global Stats
  public tgeDate: WritableSignal<Date | null> = signal(null);
  public totalAllocated: WritableSignal<string | null> = signal(null);
  public totalClaimed: WritableSignal<string | null> = signal(null);

  private categoryNames: {[key: number]: string} = {
    0: 'Token Sale Tier 1',
    1: 'Token Sale Tier 2',
    2: 'Token Sale Tier 3',
    3: 'Team & Advisors',
    4: 'Liquidity/Treasury',
    5: 'Community Airdrops'
  };

  constructor() {
    this.fetchGlobalStats();
  }

  public async fetchGlobalStats() {
    try {
      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, provider);

      const [tgeTs, totalAlloc, totalClm] = await Promise.all([
        contract['tgeTimestamp'](),
        contract['totalAllocated'](),
        contract['totalClaimed']()
      ]);

      // tgeTs is BigInt in seconds, convert to ms for JS Date
      this.tgeDate.set(new Date(Number(tgeTs) * 1000));
      this.totalAllocated.set(formatUnits(totalAlloc, 18));
      this.totalClaimed.set(formatUnits(totalClm, 18));

    } catch (err) {
      console.error('Error fetching global vesting stats:', err);
    }
  }

  // We will call this when wallet connects
  public async fetchClaimableAmount(address: string) {
    try {
      // Check initialization status first
      this.checkInitializationNeeded(address);

      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, provider);
      
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
        // Use the currently selected account
        const currentAccount = this.walletService.currentAccount();
        const signer = await provider.getSigner(currentAccount || undefined);
        const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, signer);

        const tx = await contract['claim'](category);
        await tx.wait();
        
        // Refresh balances after claim
        const address = await signer.getAddress();
        await this.fetchClaimableAmount(address);
        // Refresh global stats too as totalClaimed changed
        await this.fetchGlobalStats();
        
      } catch (err: any) {
        console.error('Error claiming tokens:', err);
        this.error.set(err.message || 'Failed to claim tokens');
      } finally {
        this.isClaiming.set(false);
      }
    }
  }

  public async checkInitializationNeeded(address: string) {
    try {
      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, provider);

      // Fetch API data
      const response = await fetch(`${environment.supabaseRestUrl}?address=${address}`);
      if (!response.ok) return;
      const json = await response.json();
      const allocations = json.data || [];

      // Populate user allocations from Supabase data
      const userAllocs: CategoryClaim[] = [];
      let needed = false;

      for (const alloc of allocations) {
        const category = alloc.category;
        
        // Add to user allocations list
        userAllocs.push({
          category: category,
          name: this.categoryNames[category],
          amount: formatUnits(BigInt(alloc.amount_wei), 18)
        });

        const allocData = await contract['getAllocation'](address, category);
        // allocData is [totalAmount, claimedAmount, initialized]
        if (!allocData[2]) {
          needed = true;
          // Don't break here so we can continue processing other allocations if needed, 
          // though for 'needed' flag true is enough. 
          // But we want to process all userAllocs.
        }
      }
      
      this.userAllocations.set(userAllocs);
      this.initializationNeeded.set(needed);
    } catch (err) {
      console.error('Error checking initialization:', err);
      this.userAllocations.set([]);
    }
  }

  public async initializeAllocations(address: string) {
    this.isInitializing.set(true);
    this.error.set(null);

    try {
      const response = await fetch(`${environment.supabaseRestUrl}?address=${address}`);
      if (!response.ok) throw new Error('Failed to fetch allocation data');
      const json = await response.json();
      const allocations = json.data || [];

      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = new BrowserProvider((window as any).ethereum);
        // Use the specific address passed to the function for signing
        const signer = await provider.getSigner(address);
        const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, signer);

        for (const alloc of allocations) {
          const { category, amount_wei, proof } = alloc;
          
          const allocData = await contract['getAllocation'](address, category);
          if (!allocData[2]) {
            // Convert amount_wei to BigInt
            let amountVal: bigint;
            if (typeof amount_wei === 'number') {
              amountVal = BigInt(amount_wei);
            } else {
              amountVal = BigInt(amount_wei);
            }

            console.log(`Initializing category ${category} with amount ${amountVal}`);
            const tx = await contract['initializeMyAllocation'](amountVal, category, proof);
            await tx.wait();
          }
        }
        
        // Refresh
        this.initializationNeeded.set(false);
        await this.fetchClaimableAmount(address);
        await this.fetchGlobalStats();
      }
    } catch (err: any) {
      console.error('Error initializing allocations:', err);
      this.error.set(err.message || 'Failed to initialize allocations');
    } finally {
      this.isInitializing.set(false);
    }
  }
}
