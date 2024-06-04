import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { validatePassword } from '../../../../shared/validators/validate-password.validator';
import { validateConfirmPassword } from '../../../../shared/validators/validate-confirm-password.validator';
import { CommonModule } from '@angular/common';
import { InputErrorMessageComponent } from '../../../../shared/components/input-error-message/input-error-message.component';
import { RouterLink } from '@angular/router';
import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../../../../shared/validators/contstants';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { validateUsernameAsync } from '../../../../shared/validators/validate-username-async.validator';

interface SignUpForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
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

  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit, OnDestroy {
  isLoading = false;
  errorMessage: null | string = null;
  private loginSub: Subscription | null = null;
  private messageSub: Subscription | null = null;
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  signUpForm = new FormGroup<SignUpForm>(
    {
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(MIN_USERNAME_LENGTH),
          Validators.maxLength(MAX_USERNAME_LENGTH),
        ],
        asyncValidators: validateUsernameAsync(),
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, validatePassword],
        nonNullable: true,
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    },
    { validators: validateConfirmPassword }
  );

  onSubmit() {
    if (!this.signUpForm.valid) return;
    this.authService.signUp(this.signUpForm.getRawValue());
    this.signUpForm.reset();
  }

  ngOnInit(): void {
    this.loginSub = this.authService.isLoading.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.messageSub = this.authService.message.subscribe((message) => {
      if (message)
        this.messageService.add({
          severity: message.type,
          summary:
            message.type === 'error'
              ? 'Failed to sign up'
              : 'Sign up successful',
          detail: message?.message,
          life: 5000,
        });
    });
  }

  ngOnDestroy(): void {
    this.authService.resetError();

    this.loginSub?.unsubscribe();
    this.messageSub?.unsubscribe();
  }
}
