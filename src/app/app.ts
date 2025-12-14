import { Component, signal, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { WalletService } from './services/wallet.service';
import { VestingService } from './services/vesting.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatePipe, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('qlabs-vesting');
  protected readonly walletService = inject(WalletService);
  protected readonly vestingService = inject(VestingService);

  constructor() {
    effect(() => {
      const account = this.walletService.currentAccount();
      if (account) {
        this.vestingService.fetchClaimableAmount(account);
      } else {
        this.vestingService.claimableAmount.set(null);
      }
    });
  }
}
