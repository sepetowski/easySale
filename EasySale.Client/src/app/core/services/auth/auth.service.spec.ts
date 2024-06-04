import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { provideRouter } from '@angular/router';
import { routes } from '../../../routes/app.routes';
import {
  UserLoginData,
  UserLoginResponseData,
  UserRegisterData,
  UserRegisterResponseData,
} from '../../../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const url = 'https://localhost:7198/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, provideRouter(routes)],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call signUp and show message', () => {
    const mockUser: UserRegisterData = {
      username: 'test',
      email: 'test@test.com',
      password: 'Test123456',
      confirmPassword: 'Test123456',
    };

    const mockResponse: UserRegisterResponseData = {
      id: '123',
      username: 'test',
      email: 'test@test.com',
    };

    service.signUp(mockUser);

    const req = httpTestingController.expectOne(`${url}/register`);
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);

    service.message.subscribe((message) => {
      if (message) {
        expect(message.message).toBe('You have been register test!');
      }
    });
  });

  it('should call signIn and sign User if token is valid', () => {
    const mockUser: UserLoginData = {
      username: 'test',
      password: 'Test123456',
    };

    const mockResponse: UserLoginResponseData = {
      id: '123',
      username: 'test',
      email: 'test@test.com',
      jsonWebToken: 'token',
      jsonWebTokenExpires: new Date(new Date().getTime() + 60 * 60 * 1000),
      refreshToken: 'refreshToken',
      firstName: null,
      lastName: null,
    };

    const mockAppUser = new User(
      mockResponse.id,
      mockResponse.username,
      mockResponse.firstName,
      mockResponse.lastName,
      mockResponse.email,
      mockResponse.jsonWebToken,
      mockResponse.jsonWebTokenExpires,
      mockResponse.refreshToken
    );
    service.signIn(mockUser);

    const req = httpTestingController.expectOne(`${url}/login`);
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);

    service.user.subscribe((user) => {
      expect(user).toEqual(mockAppUser);
    });
  });

  it('should call signIn and not sign User if token is not valid', () => {
    const mockUser: UserLoginData = {
      username: 'test',
      password: 'Test123456',
    };

    const mockResponse: UserLoginResponseData = {
      id: '123',
      username: 'test',
      email: 'test@test.com',
      jsonWebToken: 'token',
      jsonWebTokenExpires: new Date(),
      refreshToken: 'refreshToken',
      firstName: null,
      lastName: null,
    };

    service.signIn(mockUser);

    const req = httpTestingController.expectOne(`${url}/login`);
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);

    service.user.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should call logut and logut user', () => {
    service.logOut();

    service.user.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should call checkUsernameAvailable and check if it is available username', () => {
    const mockUsername = 'Test';

    const availableName = {
      exist: false,
    };

    service.checkUsernameAvailable(mockUsername).subscribe((res) => {
      expect(res).toEqual(availableName);
    });

    const req = httpTestingController.expectOne(`${url}/username-exist`);
    expect(req.request.method).toBe('POST');

    req.flush(availableName);
  });
  it('should call checkUsernameAvailable and check if it is unavailable username', () => {
    const mockUsername = 'Test';

    const unavailableName = {
      exist: true,
    };

    service.checkUsernameAvailable(mockUsername).subscribe((res) => {
      expect(res).toEqual(unavailableName);
    });

    const req = httpTestingController.expectOne(`${url}/username-exist`);
    expect(req.request.method).toBe('POST');

    req.flush(unavailableName);
  });
});
