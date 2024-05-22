import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface UserResponseData {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  jsonWebToken: string;
  jsonWebTokenExpires: Date;
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _errorMessage = new BehaviorSubject<null | string>(null);
  private _http = inject(HttpClient);

  public get isLoading() {
    return this._isLoading.asObservable();
  }
  public get errorMessage() {
    return this._errorMessage.asObservable();
  }
  public get user() {
    return this._user.asObservable();
  }

  public signUp(userData: UserRegisterData) {
    this._isLoading.next(true);

    this._http
      .post<UserResponseData>(
        'https://localhost:7198/api/auth/register',
        userData
      )
      .subscribe({
        next: this.handleAuth.bind(this),
        error: this.handleError.bind(this),
      });
  }

  public resetError() {
    this._errorMessage.next(null);
  }

  public signIn(userData: UserLoginData) {
    this._isLoading.next(true);

    this._http
      .post<UserResponseData>('https://localhost:7198/api/auth/login', userData)
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

  private handleAuth(authData: UserResponseData) {
    this._isLoading.next(false);
    this._errorMessage.next(null);

    this.saveUserData(authData);
  }

  private handleError(err: HttpErrorResponse) {
    this._isLoading.next(false);
    this._errorMessage.next(err.message);
  }

  private saveUserData(authData: UserResponseData) {
    const user = new User(
      authData.id,
      authData.username,
      authData.firstName,
      authData.lastName,
      authData.email,
      authData.jsonWebToken,
      authData.jsonWebTokenExpires
    );

    this._user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
