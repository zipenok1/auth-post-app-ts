import { Model } from 'sequelize';

export interface IUser {
  id_user?: number;
  email: string;
  password: string;
}

export interface IPosts {
  id_posts?: number;
  title: string;
  description: string;
  userId: number;
}

export interface UserInstance extends Model<IUser>, IUser {}
export interface PostsInstance extends Model<IPosts>, IPosts {}
