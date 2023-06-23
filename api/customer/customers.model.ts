import type { InitOptions, ModelAttributes, Sequelize } from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import type { ModelStatic, Model as ModelType } from 'sequelize';

import { USER_TABLE_NAME } from '../users/users.model.js';

export const CUSTOMER_TABLE = 'customers';

type Models = {
  [key: string]: ModelStatic<ModelType<any, any>>;
};

export class CustomerModel extends Model {
  static associate(models: Models): void {
    this.belongsTo(models.UserModel, { as: 'user' });
  }
  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

export const CustomerModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    // User foraign key
    references: {
      model: USER_TABLE_NAME,
      key: 'id',
    },
    // If user id is updated, update user id here
    onUpdate: 'CASCADE',
    // If user is deleted, set user id to null
    onDelete: 'SET NULL',
  },
};
