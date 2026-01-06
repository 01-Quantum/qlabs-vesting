import { Routes } from '@angular/router';
import { ConnectComponent } from './pages/connect/connect.component';
import { VestingDetailsComponent } from './pages/vesting-details/vesting-details.component';

export const routes: Routes = [
  { path: '', component: ConnectComponent },
  { path: 'vesting-details', component: VestingDetailsComponent },
  { path: '**', redirectTo: '' }
];
