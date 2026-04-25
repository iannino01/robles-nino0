import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogle } from '../servicios/auth-google';

export const authGuard: CanActivateFn = () => {
  const authGoogle = inject(AuthGoogle);
  const router = inject(Router);

  if (authGoogle.autenticado()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
