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

export interface AllocationStatus {
  name: string;
  percentage: number;
  isCompleted: boolean;
  category: number;
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
  public isLoading: WritableSignal<boolean> = signal(false);
  public initializingCategoryName: WritableSignal<string | null> = signal(null);
  public uninitializedAllocations: WritableSignal<CategoryClaim[]> = signal([]);
  public initializationNeeded: WritableSignal<boolean> = signal(false);
  public allocationStatuses: WritableSignal<AllocationStatus[]> = signal([]);
  public error: WritableSignal<string | null> = signal(null);

  // User Stats
  public userAllocations: WritableSignal<CategoryClaim[]> = signal([]);
  public userTotalAllocation: WritableSignal<string | null> = signal(null);

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
    console.log('VestingService: Fetching global stats...');
    try {
      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, provider);

      const [tgeTs, totalAlloc, totalClm] = await Promise.all([
        contract['tgeTimestamp'](),
        contract['totalAllocated'](),
        contract['totalClaimed']()
      ]);
      
      console.log('VestingService: Global stats fetched:', { tgeTs, totalAlloc, totalClm });

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
    console.log(`VestingService: Fetching claimable amount for ${address}`);
    this.isLoading.set(true);
    try {
      // Check initialization status first
      await this.checkInitializationNeeded(address);
      await this.fetchAllocationStatuses(address);

      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, provider);
      
      let totalClaimable = 0n;
      const claims: CategoryClaim[] = [];
      
      for (let i = 0; i <= 5; i++) {
        const amount = await contract['getClaimableAmount'](address, i);
        if (amount > 0n) {
          console.log(`VestingService: Found claimable amount for category ${i}: ${amount}`);
          totalClaimable += amount;
          claims.push({
            category: i,
            name: this.categoryNames[i],
            amount: formatUnits(amount, 18)
          });
        }
      }
      
      console.log(`VestingService: Total claimable for ${address}: ${totalClaimable}`);

      this.claimableAmount.set(formatUnits(totalClaimable, 18));
      this.claimableCategories.set(claims);
      
    } catch (err) {
      console.error('Error fetching claimable amount:', err);
      this.claimableAmount.set(null);
      this.claimableCategories.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }

  public async claim(category: number) {
    console.log(`VestingService: Attempting to claim category ${category}`);
    this.isClaiming.set(true);
    this.error.set(null);

    try {
      // Use wallet service to get signer
      const currentAccount = this.walletService.currentAccount();
      console.log('VestingService: Getting signer for account:', currentAccount);
      
      const signer = await this.walletService.getSigner(currentAccount || undefined);
      const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, signer);

      const tx = await contract['claim'](category);
      console.log('VestingService: Claim transaction sent:', tx.hash);
      
      await tx.wait();
      console.log('VestingService: Claim transaction confirmed');
      
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

  public async checkInitializationNeeded(address: string) {
    console.log(`VestingService: Checking initialization needed for ${address}`);
    try {
      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, provider);

      // Fetch API data
      const response = await fetch(`${environment.supabaseRestUrl}?address=${address}`);
      if (!response.ok) {
          console.error('VestingService: Failed to fetch Supabase data');
          return;
      }
      const json = await response.json();
      const allocations = json.data || [];
      
      console.log(`VestingService: Found ${allocations.length} allocations in DB for ${address}`);

      // Populate user allocations from Supabase data
      const userAllocs: CategoryClaim[] = [];
      const uninitializedAllocs: CategoryClaim[] = [];
      let totalAllocationWei = 0n;
      let needed = false;

      for (const alloc of allocations) {
        const category = alloc.category;
        const amountWei = BigInt(alloc.amount_wei);
        totalAllocationWei += amountWei;
        
        const claimObj: CategoryClaim = {
          category: category,
          name: this.categoryNames[category],
          amount: formatUnits(amountWei, 18)
        };
        
        // Add to user allocations list
        userAllocs.push(claimObj);

        const allocData = await contract['getAllocation'](address, category);
        // allocData is [totalAmount, claimedAmount, initialized]
        if (!allocData[2]) {
          console.log(`VestingService: Allocation for category ${category} needs initialization`);
          needed = true;
          uninitializedAllocs.push(claimObj);
          // Don't break here so we can continue processing other allocations if needed, 
          // though for 'needed' flag true is enough. 
          // But we want to process all userAllocs.
        } else {
             console.log(`VestingService: Allocation for category ${category} already initialized`);
        }
      }
      
      this.userAllocations.set(userAllocs);
      this.userTotalAllocation.set(formatUnits(totalAllocationWei, 18));
      this.initializationNeeded.set(needed);
      this.uninitializedAllocations.set(uninitializedAllocs);
    } catch (err) {
      console.error('Error checking initialization:', err);
      this.userAllocations.set([]);
      this.userTotalAllocation.set(null);
      this.uninitializedAllocations.set([]);
    }
  }

  public async fetchAllocationStatuses(address: string) {
    console.log(`VestingService: Fetching allocation statuses for ${address}`);
    try {
      const provider = new JsonRpcProvider(environment.networkDetails.rpcUrls[0]);
      const contract = new Contract(environment.vestingContractAddress, VESTING_ABI, provider);
      
      const statuses: AllocationStatus[] = [];
      
      for (let i = 0; i <= 5; i++) {
        const [claimable, allocData] = await Promise.all([
            contract['getClaimableAmount'](address, i),
            contract['getAllocation'](address, i)
        ]);
        
        // allocData is [totalAmount, claimedAmount, initialized]
        const totalAmount = allocData[0];
        const claimedAmount = allocData[1];
        const initialized = allocData[2];

        if (initialized || totalAmount > 0n) {
            const vestedAmount = claimedAmount + claimable;
            const percentage = totalAmount > 0n 
                ? Number((vestedAmount * 10000n) / totalAmount) / 100 
                : 0;
            
            statuses.push({
                name: this.categoryNames[i],
                percentage: percentage,
                isCompleted: percentage >= 100,
                category: i
            });
        }
      }
      
      this.allocationStatuses.set(statuses);
    } catch (err) {
      console.error('Error fetching allocation statuses:', err);
    }
  }

  public async initializeAllocations(address: string) {
    console.log(`VestingService: initializeAllocations called for ${address}`);
    this.isInitializing.set(true);
    this.error.set(null);

    try {
      const response = await fetch(`${environment.supabaseRestUrl}?address=${address}`);
      if (!response.ok) throw new Error('Failed to fetch allocation data');
      const json = await response.json();
      const allocations = json.data || [];
      
      console.log('VestingService: Allocations to process:', allocations);

      try {
        // Use wallet service to get signer
        console.log('VestingService: Getting signer for address:', address);
        const signer = await this.walletService.getSigner(address);
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

            console.log(`VestingService: Initializing category ${category} with amount ${amountVal}, proof: ${proof}`);
            
            // Set the initializing category name
            this.initializingCategoryName.set(this.categoryNames[category]);
            
            const tx = await contract['initializeMyAllocation'](amountVal, category, proof);
            console.log('VestingService: Initialization tx sent:', tx.hash);
            await tx.wait();
            console.log('VestingService: Initialization tx confirmed');
            
            // Clear the initializing category name
            this.initializingCategoryName.set(null);
          } else {
              console.log(`VestingService: Skipping category ${category}, already initialized`);
          }
        }
        
        // Refresh
        this.initializationNeeded.set(false);
        await this.fetchClaimableAmount(address);
        await this.fetchGlobalStats();
      } catch (e) {
          throw e;
      }
    } catch (err: any) {
      console.error('Error initializing allocations:', err);
      this.error.set(err.message || 'Failed to initialize allocations');
    } finally {
      this.isInitializing.set(false);
      this.initializingCategoryName.set(null);
    }
  }
}
