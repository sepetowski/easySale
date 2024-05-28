import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, exhaustMap, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) return next(req);

      const newReq = req.clone({
        params: new HttpParams().set('Authorization', `Bearer ${user.token}`),
      });

      return next(newReq);
    }),
    catchError((err: HttpErrorResponse) => {
      console.log(err);

      if (err.status === 401) {
        console.log('Unauthorized');
        router.navigate(['/']);
      }

      return throwError(() => err);
    })
  );
};
