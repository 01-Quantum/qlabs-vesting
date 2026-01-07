import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { VestingService } from '../../services/vesting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vesting',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './vesting.component.html',
  styleUrl: './vesting.component.scss'
})
export class VestingComponent {
  protected readonly walletService = inject(WalletService);
  protected readonly vestingService = inject(VestingService);
  private router = inject(Router);

  public showWalletDropdown = false;

  constructor() {
    effect(() => {
      const account = this.walletService.currentAccount();
      if (account) {
        this.vestingService.fetchClaimableAmount(account);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  public toggleWalletDropdown() {
    this.showWalletDropdown = !this.showWalletDropdown;
  }

  public selectAccount(account: string) {
    this.walletService.switchAccount(account);
    this.showWalletDropdown = false;
  }

  public async claimAll() {
    console.log('VestingComponent: Starting claimAll');
    const categories = this.vestingService.claimableCategories();
    if (categories.length === 0) {
      console.warn('VestingComponent: No categories to claim');
      return;
    }

    this.vestingService.isClaiming.set(true);
    try {
      for (const cat of categories) {
        console.log(`VestingComponent: Claiming category ${cat.name} (${cat.category})`);
        await this.vestingService.claim(cat.category, true);
      }
    } catch (err) {
      console.error('VestingComponent: Error in claimAll loop:', err);
    } finally {
      this.vestingService.isClaiming.set(false);
    }
  }

  public async initialize() {
    console.log('VestingComponent: Starting initialize');
    const account = this.walletService.currentAccount();
    if (account) {
      try {
        await this.vestingService.initializeAllocations(account);
      } catch (err) {
        console.error('VestingComponent: Initialization failed:', err);
      }
    }
  }

  public async switchWallet() {
    await this.walletService.disconnectWallet();
    this.router.navigate(['/']);
  }

  public hasAllocations(): boolean {
    return this.vestingService.userAllocations().length > 0 || 
           this.vestingService.allocationStatuses().length > 0;
  }

  public shortenAddress(addr: string | null): string {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }
}

