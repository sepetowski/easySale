export class User {
  constructor(
    private readonly _id: string,
    private _username: string,
    private _firstName: string | null,
    private _lastName: string | null,
    private _email: string,
    private _token: string,
    private _tokenExpirationDate: Date | null,
    private _refreshToken: string,
    private _refreshTokenExpires: Date,
    private _profileImageUrl: string | null
  ) {}

  get id() {
    return this._id;
  }
  get username() {
    return this._username;
  }
  get refreshToken() {
    return this._refreshToken;
  }
  get firstName() {
    return this._firstName;
  }
  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email;
  }

  get token() {
    return this._token;
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }

  get refreshTokenExpires() {
    return this._refreshTokenExpires;
  }

  get profileImageUrl() {
    return this._profileImageUrl;
  }
}
