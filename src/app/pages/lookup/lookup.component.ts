import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VestingService } from '../../services/vesting.service';
import { WalletService } from '../../services/wallet.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lookup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lookup.component.html',
  styleUrl: './lookup.component.css'
})
export class LookupComponent {
  private vestingService = inject(VestingService);
  
  public addressInput = '';
  public isLoading = signal(false);
  public error = signal<string | null>(null);
  public stats = signal<any>(null);

  public async performLookup() {
    if (!this.addressInput || this.addressInput.length < 42) {
      this.error.set('Please enter a valid wallet address');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.stats.set(null);

    try {
      const data = await this.vestingService.getUserStats(this.addressInput.trim());
      this.stats.set(data);
    } catch (err: any) {
      console.error('Lookup failed:', err);
      this.error.set('Failed to fetch data for this address. Make sure it is a valid EVM address.');
    } finally {
      this.isLoading.set(false);
    }
  }

  public shortenAddress(addr: string): string {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }
}
