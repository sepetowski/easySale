import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

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

  it('should require valid username', () => {
    component.signUpForm.setValue({
      username: '_',
      email: '',
      password: '',
      confirmPassword: '',
    });

    expect(component.signUpForm.valid).toEqual(false);
  });

  it('should require valid password', () => {
    component.signUpForm.setValue({
      username: '',
      email: '',
      password: 'wrongPassword',
      confirmPassword: '',
    });

    expect(component.signUpForm.valid).toEqual(false);
  });

  it('should require valid email', () => {
    component.signUpForm.setValue({
      username: '',
      email: 'not valid email',
      password: '',
      confirmPassword: '',
    });

    expect(component.signUpForm.valid).toEqual(false);
  });

  it('should require valid confirm Password', () => {
    component.signUpForm.setValue({
      username: '',
      email: '',
      password: 'GoodPassword1',
      confirmPassword: 'Password',
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
