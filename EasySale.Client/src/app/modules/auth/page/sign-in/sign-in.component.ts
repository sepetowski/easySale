import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputErrorMessageComponent } from '../../../../shared/components/input-error-message/input-error-message.component';
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
} from '../../../../shared/validators/contstants';
import { validatePassword } from '../../../../shared/validators/validate-password.validator';

interface SignInForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    DividerModule,
    ReactiveFormsModule,
    InputErrorMessageComponent,
    RouterLink,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  signInForm = new FormGroup<SignInForm>({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(MIN_USERNAME_LENGTH),
        Validators.maxLength(MAX_USERNAME_LENGTH),
      ],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, validatePassword],
      nonNullable: true,
    }),
  });

  onSubmit() {
    console.log(this.signInForm);
    this.signInForm.reset();
  }
}
