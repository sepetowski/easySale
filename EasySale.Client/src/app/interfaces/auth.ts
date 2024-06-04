export interface JsonUser {
  _email: string;
  _firstName: string | null;
  _id: string;
  _lastName: string | null;
  _token: string;
  _tokenExpirationDate: string;
  _username: string;
  _refreshToken: string;
}

export interface UserRegisterResponseData {
  id: string;
  email: string;
  username: string;
}

export interface UserLoginResponseData {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  jsonWebToken: string;
  jsonWebTokenExpires: Date;
  refreshToken: string;
}

export interface UserLoginData {
  username: string;
  password: string;
}

export interface UserRegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRes {
  token: string;
  refreshToken: string;
  tokenExpires: string;
}
export interface RefreshTokenReq {
  token: string;
  refreshToken: string;
}

export interface Message {
  type: 'error' | 'success';
  message: string;
}
