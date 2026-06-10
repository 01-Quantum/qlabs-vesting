import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WalletService } from '../services/wallet.service';

export const walletConnectedGuard: CanActivateFn = async () => {
  const walletService = inject(WalletService);
  const router = inject(Router);

  await walletService.ready;

  if (!walletService.currentAccount()) {
    return router.createUrlTree(['/']);
  }

  return true;
};
