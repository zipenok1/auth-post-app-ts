import type { Request } from 'express';

export interface JwtPayload {
  id_user: number;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
