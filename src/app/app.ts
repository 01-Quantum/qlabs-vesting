import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { WalletService } from './services/wallet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly walletService = inject(WalletService);
  private router = inject(Router);

  public showWalletDropdown = false;

  public toggleWalletDropdown() {
    this.showWalletDropdown = !this.showWalletDropdown;
  }

  public selectAccount(account: string) {
    this.walletService.switchAccount(account);
    this.showWalletDropdown = false;
  }

  public async disconnect() {
    await this.walletService.disconnectWallet();
    this.showWalletDropdown = false;
    this.router.navigate(['/']);
  }

  public shortenAddress(addr: string | null): string {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }

  public async addToken() {
    await this.walletService.addTokenToMetaMask();
  }
}
