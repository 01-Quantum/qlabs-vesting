import { Routes } from '@angular/router';
import { ConnectComponent } from './pages/connect/connect.component';
import { VestingComponent } from './pages/vesting/vesting.component';
import { VestingDetailsComponent } from './pages/vesting-details/vesting-details.component';
import { LookupComponent } from './pages/lookup/lookup.component';
import { walletConnectedGuard } from './guards/wallet-connected.guard';

export const routes: Routes = [
  { path: '', component: ConnectComponent },
  { path: 'vesting', component: VestingComponent, canActivate: [walletConnectedGuard] },
  { path: 'vesting-details', component: VestingDetailsComponent, canActivate: [walletConnectedGuard] },
  { path: 'lookup', component: LookupComponent },
  { path: '**', redirectTo: '' }
];
