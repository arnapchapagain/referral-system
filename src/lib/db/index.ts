import { Sequelize } from 'sequelize';
import Users from './models/users';
import Links from './models/links';

const DB_PATH = process.env.DB_PATH || "database.db";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_PATH
});

export {
  sequelize,
  Users,
  Links
};