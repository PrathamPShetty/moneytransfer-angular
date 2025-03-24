import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService} from '../../services/auth/auth.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { getConfig} from '../../utils/session-storage.utils';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const sbService = inject(SnackBarService);
  let routeConfig = getConfig();

  // If user is not logged in, redirect to Login page
  if (!authService.isLoggedIn()) {
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

  // Allow access to profile page for logged-in users
  if (state.url === '/profile') {
    return true;
  }

  // Allow access to transaction and transfer pages only for authenticated users
  if (state.url === '/transactions' || state.url === '/transfer') {
    return true;
  }

  // If route config is missing, force re-login
  if (!routeConfig) {
    sbService.openSnack('Session expired! Please login again.', 'Close');
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

  // Check if the route is allowed in the route configuration
  if (!routeConfig['route-config'][state.url.substring(1)]) {
    sbService.openSnack("You're not authorized to access this page.", 'Close');
    return false;
  }

  return true;
};
