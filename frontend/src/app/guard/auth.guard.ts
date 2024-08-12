import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const isAuthenticated = authService.isLoggedIn.getValue();
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
