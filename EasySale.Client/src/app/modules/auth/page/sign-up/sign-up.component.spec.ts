import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';
import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../../../../shared/validators/contstants';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid username (too short username)', () => {
    component.signUpForm.setValue({
      username: '_',
      email: 'user@account.com',
      password: 'GoodPassword1',
      confirmPassword: 'GoodPassword1',
    });

    expect(component.signUpForm.controls.username.errors).toEqual({
      minlength: { requiredLength: MIN_USERNAME_LENGTH, actualLength: 1 },
    });
  });

  it('should require valid username (too long username)', () => {
    component.signUpForm.setValue({
      username: '1234567890123456789012345678901', //31
      email: 'user@account.com',
      password: 'GoodPassword1',
      confirmPassword: 'GoodPassword1',
    });

    expect(component.signUpForm.controls.username.errors).toEqual({
      maxlength: { requiredLength: MAX_USERNAME_LENGTH, actualLength: 31 },
    });
  });

  it('should require valid password', () => {
    component.signUpForm.setValue({
      username: 'User',
      email: 'user@account.com',
      password: 'wrongPassword',
      confirmPassword: 'wrongPassword',
    });

    expect(component.signUpForm.controls.password.errors).toEqual({
      notValidPassword: true,
    });
  });

  it('should require valid email', () => {
    component.signUpForm.setValue({
      username: 'User',
      email: 'not valid email',
      password: 'GoodPassword1',
      confirmPassword: 'GoodPassword1',
    });

    expect(component.signUpForm.controls.email.errors).toEqual({
      email: true,
    });
  });

  it('should require valid confirm Password', () => {
    component.signUpForm.setValue({
      username: 'User',
      email: 'user@account.com',
      password: 'GoodPassword1',
      confirmPassword: 'Password',
    });

    expect(component.signUpForm.errors).toEqual({ notMatched: true });
  });

  it('should require all fileds', () => {
    component.signUpForm.setValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    expect(component.signUpForm.valid).toEqual(false);
  });

  it('should form be valid for all valid fields', () => {
    component.signUpForm.setValue({
      username: 'User',
      email: 'user@account.com',
      password: 'GoodPassword1',
      confirmPassword: 'GoodPassword1',
    });

    expect(component.signUpForm.valid).toEqual(true);
  });
});
