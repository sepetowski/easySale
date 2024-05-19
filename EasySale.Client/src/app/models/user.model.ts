export class User {
  constructor(
    private readonly _id: string,
    private _email: string,
    private _token: string | null,
    private _tokenExpirationDate: Date | null
  ) {}

  get id() {
    return this._id;
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
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._tokenExpirationDate;
  }
}
