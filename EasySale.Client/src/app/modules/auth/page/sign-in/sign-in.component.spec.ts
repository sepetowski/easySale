import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../routes/app.routes';
import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../../../../shared/validators/contstants';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid username (too short username)', () => {
    component.signInForm.setValue({
      username: '_',
      password: 'GoodPassword1',
    });

    expect(component.signInForm.controls.username.errors).toEqual({
      minlength: { requiredLength: MIN_USERNAME_LENGTH, actualLength: 1 },
    });
  });

  it('should require valid username (too long username)', () => {
    component.signInForm.setValue({
      username: '1234567890123456789012345678901', //31
      password: 'GoodPassword1',
    });

    expect(component.signInForm.controls.username.errors).toEqual({
      maxlength: { requiredLength: MAX_USERNAME_LENGTH, actualLength: 31 },
    });
  });

  it('should require valid password', () => {
    component.signInForm.setValue({
      username: 'User',
      password: 'wrongPassword',
    });

    expect(component.signInForm.controls.password.errors).toEqual({
      notValidPassword: true,
    });
  });

  it('should require all fileds', () => {
    component.signInForm.setValue({
      username: '',
      password: '',
    });

    expect(component.signInForm.valid).toEqual(false);
  });

  it('should form be valid for all valid fields', () => {
    component.signInForm.setValue({
      username: 'User',
      password: 'GoodPassword1',
    });

    expect(component.signInForm.valid).toEqual(true);
  });
});
