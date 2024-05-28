import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface JsonUser {
  _email: string;
  _firstName: string | null;
  _id: string;
  _lastName: string | null;
  _token: string;
  _tokenExpirationDate: string;
  _username: string;
  _refreshToken: string;
}

interface UserRegisterResponseData {
  id: string;
  email: string;
  username: string;
}

interface UserLoginResponseData {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  jsonWebToken: string;
  jsonWebTokenExpires: Date;
  refreshToken: string;
}

interface UserLoginData {
  username: string;
  password: string;
}

interface UserRegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RefreshTokenRes {
  token: string;
  refreshToken: string;
  tokenExpires: string;
}
interface RefreshTokenReq {
  token: string;
  refreshToken: string;
}

interface Message {
  type: 'error' | 'success';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _message = new BehaviorSubject<null | Message>(null);

  private _tokenExpirationTimer: NodeJS.Timeout | null = null;

  private _router = inject(Router);
  private _http = inject(HttpClient);

  public get isLoading() {
    return this._isLoading.asObservable();
  }
  public get message() {
    return this._message.asObservable();
  }
  public get user() {
    return this._user.asObservable();
  }

  public signUp(userData: UserRegisterData) {
    this._isLoading.next(true);

    this._http
      .post<UserRegisterResponseData>(
        'https://localhost:7198/api/auth/register',
        userData
      )
      .subscribe({
        next: this.handleRegistration.bind(this),
        error: this.handleError.bind(this),
      });
  }

  public tryToSignInOnStart() {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const user: JsonUser = JSON.parse(userData);

    //TODO check if user has valid type

    const loggedUser = new User(
      user._id,
      user._username,
      user._firstName,
      user._lastName,
      user._email,
      user._token,
      new Date(user._tokenExpirationDate),
      user._refreshToken
    );

    this._user.next(loggedUser);

    const expirationDuration =
      loggedUser.tokenExpirationDate!.getTime() - new Date().getTime();

    if (expirationDuration > 0)
      this.startTokenExpirationCountdown(expirationDuration);
    else this.refreshToken();
  }

  public logOut() {
    this._user.next(null);

    localStorage.removeItem('user');
    this._router.navigate(['/']);

    this.clearTokenExpirationTimer();
  }

  public resetError() {
    this._message.next(null);
  }

  public signIn(userData: UserLoginData) {
    this._isLoading.next(true);
    console.log(userData);
    this._http
      .post<UserLoginResponseData>(
        'https://localhost:7198/api/auth/login',
        userData
      )
      .subscribe({
        next: this.handleAuth.bind(this),
        error: this.handleError.bind(this),
      });
  }

  public checkUsernameAvaible(username: string) {
    return this._http.post<{ exist: boolean }>(
      'https://localhost:7198/api/auth/username-exist',
      { username }
    );
  }

  private handleRegistration(userResponse: UserRegisterResponseData) {
    this._message.next({ type: 'success', message: 'You have been register!' });
    this._isLoading.next(false);
    this._message.next(null);

    this._router.navigate(['/sign-in']);
  }

  private handleAuth(authData: UserLoginResponseData) {
    this._message.next({ type: 'success', message: 'You have been sign in!' });
    console.log(authData);
    this._isLoading.next(false);
    this._message.next(null);

    const user = new User(
      authData.id,
      authData.username,
      authData.firstName,
      authData.lastName,
      authData.email,
      authData.jsonWebToken,
      new Date(authData.jsonWebTokenExpires),
      authData.refreshToken
    );

    this._user.next(user);
    const expirationDuration =
      user.tokenExpirationDate!.getTime() - new Date().getTime();

    this.startTokenExpirationCountdown(expirationDuration);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private handleError(err: HttpErrorResponse) {
    this._isLoading.next(false);
    this._message.next({ type: 'error', message: err.error });
  }

  private startTokenExpirationCountdown(expirationDuration: number) {
    this.clearTokenExpirationTimer();
    console.log(expirationDuration);

    this._tokenExpirationTimer = setTimeout(() => {
      this.refreshToken();
    }, expirationDuration);
  }

  private clearTokenExpirationTimer() {
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
      this._tokenExpirationTimer = null;
    }
  }

  private refreshToken() {
    const user = this._user.getValue();
    if (!user) return;

    const refreshTokenReq: RefreshTokenReq = {
      refreshToken: user.refreshToken,
      token: user.token!,
    };

    this._http
      .post<RefreshTokenRes>(
        'https://localhost:7198/api/auth/refresh-token',
        refreshTokenReq
      )
      .subscribe({
        next: this.handleRefreshTokenRes.bind(this),
        error: this.logOut.bind(this),
      });
  }

  private handleRefreshTokenRes(refreshTokenRes: RefreshTokenRes) {
    const user = this._user.getValue();

    if (user) {
      const newUser = new User(
        user.id,
        user.username,
        user.firstName,
        user.lastName,
        user.email,
        refreshTokenRes.token,
        new Date(refreshTokenRes.tokenExpires),
        refreshTokenRes.refreshToken
      );

      this._user.next(newUser);

      const expirationDuration =
        newUser.tokenExpirationDate!.getTime() - new Date().getTime();

      this.startTokenExpirationCountdown(expirationDuration);

      localStorage.setItem('user', JSON.stringify(newUser));
    }
  }
}
