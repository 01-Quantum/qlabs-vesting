import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { VestingService } from '../../services/vesting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vesting',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './vesting.component.html',
  styleUrl: './vesting.component.scss'
})
export class VestingComponent {
  protected readonly walletService = inject(WalletService);
  protected readonly vestingService = inject(VestingService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const account = this.walletService.currentAccount();
      if (account) {
        this.vestingService.fetchClaimableAmount(account);
      } else {
        this.vestingService.claimableAmount.set(null);
        this.router.navigate(['/']);
      }
    });
  }

  public async refresh() {
    await this.walletService.refreshBalances();
    const account = this.walletService.currentAccount();
    if (account) {
      await this.vestingService.fetchClaimableAmount(account);
    }
  }
}

