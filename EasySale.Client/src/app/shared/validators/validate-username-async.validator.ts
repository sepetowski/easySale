import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';

export const validateUsernameAsync = (): AsyncValidatorFn => {
  const authService = inject(AuthService);

  return (control: AbstractControl) => {
    return timer(500).pipe(
      switchMap(() =>
        authService
          .checkUsernameAvaible(control.value)
          .pipe(map((result) => (result.exist ? { asyncInvalid: true } : null)))
      )
    );
  };
};
