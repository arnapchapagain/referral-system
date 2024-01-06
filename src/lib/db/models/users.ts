import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || "database.db"
});

class Users extends Model {
    userId!: number;
    username!: string;
    password!: string;
}

Users.init({
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(32),
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'users',
    underscored: true
});

export default Users;