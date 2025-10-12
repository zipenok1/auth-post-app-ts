import model from 'models/model.js';
import type { Response } from 'express';
import type { AuthRequest } from 'type/auth.type.js';
import type { IPostRespon } from 'type/posts.type.js';

class PostsComtroller {
  async receipt(req: AuthRequest, res: Response<IPostRespon[] | { message: string }>) {
    try {
      if (!req.user) return res.status(401).json({ message: 'требуеться авторизация' });
      const posts = await model.Posts.findAll();
      return res.status(201).json(posts);
    } catch (e) {
      console.error('ошибка получения', e);
    }
  }
  async add(req: AuthRequest, res: Response<IPostRespon | { message: string }>) {
    try {
      if (!req.user) return res.status(401).json({ message: 'требуеться авторизация' });
      const { title, description } = req.body;
      const posts = await model.Posts.create({ title, description, userId: req.user.id_user });

      if (!posts) return res.status(401).json({ message: 'ошибка создания поста' });
      return res.status(201).json(posts);
    } catch (e) {
      console.error('ошибка создания', e);
    }
  }
  async editing(req: AuthRequest, res: Response<IPostRespon | { message: string }>) {
    try {
      if (!req.user) return res.status(401).json({ message: 'требуеться авторизация' });
      const { id } = req.params;
      if (!id) return res.status(401).json({ message: 'такого поста не существует' });
      const { title, description } = req.body;

      const posts = await model.Posts.findOne({ where: { id_posts: id } });
      if (!posts) return res.status(401).json({ message: 'ошибка в данных' });

      await model.Posts.update({ title: title, description: description }, { where: { id_posts: id } });
      return res.status(201).json({ message: 'пост обновлен' });
    } catch (e) {
      console.error('ошибка редактирования', e);
    }
  }
  async delete(req: AuthRequest, res: Response<IPostRespon | { message: string }>) {
    try {
      if (!req.user) return res.status(401).json({ message: 'требуеться авторизация' });
      const { id } = req.params;
      if (!id) return res.status(401).json({ message: 'такого поста не существует' });

      const posts = await model.Posts.findOne({
        where: {
          id_posts: id,
          userId: req.user.id_user,
        },
      });
      if (!posts) return res.status(404).json({ message: 'не найден' });

      await model.Posts.destroy({
        where: {
          id_posts: id,
          userId: req.user.id_user,
        },
      });
      return res.status(200).json({ message: 'пост удален' });
    } catch (e) {
      console.error('ошибка удаления', e);
    }
  }
}

export default new PostsComtroller();
