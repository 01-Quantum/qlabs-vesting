import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { VestingService } from '../../services/vesting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vesting-details',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './vesting-details.component.html',
  styleUrl: './vesting-details.component.scss'
})
export class VestingDetailsComponent {
  protected readonly walletService = inject(WalletService);
  protected readonly vestingService = inject(VestingService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const account = this.walletService.currentAccount();
      if (!account) {
        void this.walletService.ready.then(() => {
          if (!this.walletService.currentAccount()) {
            this.router.navigate(['/']);
          }
        });
        return;
      }
      this.vestingService.fetchClaimableAmount(account);
    });
  }

  public async disconnect() {
    await this.walletService.disconnectWallet();
    this.router.navigate(['/']);
  }

  public async refresh() {
    await this.walletService.refreshBalances();
    const account = this.walletService.currentAccount();
    if (account) {
      await this.vestingService.fetchClaimableAmount(account);
    }
  }
}
