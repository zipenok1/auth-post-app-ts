import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import type { PostsInstance, UserInstance } from './model.type.js';

const User = sequelize.define<UserInstance>(
  'user',
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    tableName: 'user',
    timestamps: false,
  },
);

const Posts = sequelize.define<PostsInstance>(
  'posts',
  {
    id_posts: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id_user',
      },
    },
  },
  {
    tableName: 'posts',
    timestamps: false,
  },
);

User.hasMany(Posts, { foreignKey: 'userId', as: 'posts' });
Posts.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default {
  User,
  Posts,
};
