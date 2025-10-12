import type { Response, NextFunction } from 'express';
import type { AuthRequest, JwtPayload } from '../type/auth.type.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'требуется авторизация' });

    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'неверный формат токена' });

    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decode.id_user || !decode.email) return res.status(401).json({ message: 'невалидный токен' });
    req.user = decode;
    next();
  } catch (e) {
    return res.json({ message: 'неверный токен' });
  }
};
