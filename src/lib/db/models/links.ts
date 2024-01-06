import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || "database.db"
});

class Links extends Model {
    code!: string;
    redirectUrl!: string;
    views!: number;
    createdBy!: string;
}

// code varchar(8) PRIMARY KEY,
// redirect_url TEXT NOT NULL,
// views INTEGER NOT NULL,
// created_by varchar(32) NOT NULL,
// created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
// FOREIGN KEY (created_by) REFERENCES users(username)

Links.init({
    code: {
      type: DataTypes.STRING(8),
      primaryKey: true
    },
    redirectUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING(32),
        allowNull: false,
        references: {
            model: 'users',
            key: 'username'
        }
    }
  },{
    sequelize,
    modelName: 'links',
    underscored: true
});

export default Links;