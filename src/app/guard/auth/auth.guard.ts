import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { getConfig } from '../../utils/session-storage.utils';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const sbService = inject(SnackBarService);

  let routeConfig = getConfig() || {}; // Ensure it's not null

  // If user is not logged in, redirect to Login page
  if (!authService.isLoggedIn()) {
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

  // Allow access to key pages for logged-in users
  const allowedRoutes = ['/profile', '/transactions', '/transfer'];
  if (allowedRoutes.includes(state.url)) {
    return true;
  }

  // If route configuration is missing, force re-login
  if (!routeConfig['route-config']) {
    sbService.openSnack('Session expired! Please log in again.', 'Close');
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

  // Check if the route is allowed in route config
  if (!routeConfig['route-config'][state.url.substring(1)]) {
    sbService.openSnack("You're not authorized to access this page.", 'Close');
    return false;
  }

  return true;
};
