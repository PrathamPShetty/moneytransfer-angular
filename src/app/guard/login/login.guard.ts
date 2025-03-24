import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RouteConstants} from '../../constants/route-constants';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    router.navigate([RouteConstants.PROFILE], { replaceUrl: true });
    return false;
  }
  return true;
};
