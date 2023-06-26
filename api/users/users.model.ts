import { Model, Sequelize, DataTypes } from 'sequelize';
import type { InitOptions, ModelAttributes } from 'sequelize';

import { sequelize } from '../../libs/sequelize.js';

export const USER_MODEL_NAME = 'User';
export const USER_TABLE_NAME = 'users';

console.log('Hello from users.model.ts');

export class UserModel extends Model {
  // TODO: Read this https://sequelize.org/docs/v6/core-concepts/assocs/#options
  static associate(): void {
    // Has one creates the foreign key in the target model (Customer in this case)
    console.log('UserModel.associate()');
    this.hasOne(sequelize.models.Customer, {
      as: 'customer',
      foreignKey: 'userId',
    });
    console.log('UserModel.associate() - after hasOne');
  }

  static config(): InitOptions {
    return {
      sequelize,
      tableName: USER_TABLE_NAME,
      modelName: USER_MODEL_NAME,
      timestamps: false,
    };
  }
}

export const UserModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  age: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  },
};
