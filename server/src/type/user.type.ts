import type { Request } from 'express';

export interface IUserResponse {
  id_user?: number | undefined;
  email: string;
}

export interface IUserAuthResponse {
  token: string;
  user: IUserResponse;
}

export interface IUserRequest extends Request {
  body: {
    id_user?: number;
    email: string;
    password: string;
  };
}
