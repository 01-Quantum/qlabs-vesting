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
    const categories = this.vestingService.claimableCategories();
    if (categories.length === 0) return;

    for (const cat of categories) {
      await this.vestingService.claim(cat.category);
    }
  }

  public async initialize() {
    const account = this.walletService.currentAccount();
    if (account) {
      await this.vestingService.initializeAllocations(account);
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

