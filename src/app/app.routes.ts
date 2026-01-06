import { Routes } from '@angular/router';
import { ConnectComponent } from './pages/connect/connect.component';
import { VestingComponent } from './pages/vesting/vesting.component';

export const routes: Routes = [
  { path: '', component: ConnectComponent },
  { path: 'vesting', component: VestingComponent },
  { path: '**', redirectTo: '' }
];
