export class User {
  constructor(
    private readonly _id: string,
    private _username: string,
    private _firstName: string | null,
    private _lastName: string | null,
    private _email: string,
    private _token: string | null,
    private _tokenExpirationDate: Date | null
  ) {}

  get id() {
    return this._id;
  }
  get username() {
    return this._username;
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
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }
}
