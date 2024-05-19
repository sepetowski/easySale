import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface UserResponseData {
  id: string;
  email: string;
  jsonWebToken: string;
  jsonWebTokenExpires: Date;
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

  private handleAuth(authData: UserResponseData) {
    this._isLoading.next(false);
    this._errorMessage.next(null);

    console.log(authData);
  }

  private handleError(err: HttpErrorResponse) {
    this._isLoading.next(false);
    const defaultMessage = 'An error occured';
    const errorMg =
      err.error && typeof err.error === 'string' ? err.error : defaultMessage;

    this._errorMessage.next(errorMg);
  }
}
