export interface ICredentials {
  email: string;
  password: string;
}

export interface ICredentialsLost {
  email: string;
}

export interface IToken{
  type: string;
  token: string;
}

export interface ITokened{
  id: string;
}