import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent {
  private walletService = inject(WalletService);
  private router = inject(Router);

  async connect(type: 'metamask' | 'walletconnect') {
    try {
      await this.walletService.connectWallet(type);
      if (this.walletService.currentAccount()) {
        this.router.navigate(['/vesting-details']);
      }
    } catch (error) {
      console.error('Connection failed', error);
    }
  }
}

