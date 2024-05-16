import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validatePassword: ValidatorFn = (control: AbstractControl) => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const passwordValue: string = control.value;

  if (!regExp.test(passwordValue)) {
    return { notValidPassword: true };
  }

  return null;
};
