import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;
      const requiresAuth = !route.routeConfig?.path?.startsWith('auth');

      if (requiresAuth && isAuth) {
        return true;
      }

      if (requiresAuth && !isAuth) {
        return router.createUrlTree(['/auth/sign-in']);
      }

      if (!requiresAuth && isAuth) {
        return router.createUrlTree(['/']);
      }

      return true;
    })
  );
};
