import { Sequelize, DataTypes, Model, CreationOptional } from 'sequelize';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import { User } from '../types/authtypes';

dotenv.config();

export class UserModel extends Model<User, User> {
    declare id: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    
    declare username: string;
    declare password: string;
    declare roles: string;
}

// Establish connection and verify table exists
(async () => {
    const sequelize = new Sequelize({
        database: process.env.MYSQL_BASE as string,
        username: process.env.MYSQL_USER as string,
        password: process.env.MYSQL_PASS as string,
        host: process.env.MYSQL_URL,
        dialect: 'mysql',
        dialectModule: mysql,
        logging: false
    });
    await sequelize.authenticate();

    UserModel.init({
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    
        username: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          unique: true
        },
        password: {
          type: new DataTypes.STRING(128),
          allowNull: false
        },
        roles: {
          type: new DataTypes.STRING(128),
          allowNull: false
        }
    }, {
        tableName: "Users",
        sequelize
    });
    
    await UserModel.sync();
})();
