import model from 'models/model.js';
import { hashPassword, comparePassword } from '../utilsPass.js';
import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import type { IUserAuthResponse, IUserRequest } from '../type/user.type.js';

class UserController {
  async registr(req: IUserRequest, res: Response<IUserAuthResponse | { message: string }>) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(401).json({ message: 'обязательные поля' });

      const exist = await model.User.findOne({ where: { email: email } });
      if (exist) return res.status(401).json({ message: 'user с таким email уже существует' });

      const hashedPassword = await hashPassword(password);
      const user = await model.User.create({ email, password: hashedPassword });
      if (!user) return res.status(401).json({ message: 'ошибка создания пользователя' });

      const token = jwt.sign(
        {
          id_user: user.id_user,
          email: user.email,
        },
        process.env.JWT_SECRET || 'secret-key',
        { expiresIn: '24h' },
      );

      return res.status(200).json({
        token,
        user: {
          id_user: user.id_user,
          email: user.email,
        },
      });
    } catch (e) {
      console.error('ошибка регистрации', e);
    }
  }
  async login(req: IUserRequest, res: Response<IUserAuthResponse | { message: string }>) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(401).json({ message: 'обязательные поля' });

      const user = await model.User.findOne({ where: { email: email } });
      if (!user) return res.status(401).json({ message: 'не найден' });

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) return res.status(401).json({ message: 'неверный пароль' });

      const token = jwt.sign(
        {
          id_user: user.id_user,
          email: user.email,
        },
        process.env.JWT_SECRET || 'secret-key',
        { expiresIn: '24h' },
      );

      return res.status(200).json({
        token,
        message: 'вы успешно авторизовались',
      });
    } catch (e) {
      console.error('ошибка авторизации', e);
    }
  }
}

export default new UserController();
