import { Model, Sequelize, DataTypes } from 'sequelize';
import type { InitOptions, ModelAttributes } from 'sequelize';

export const USER_MODEL_NAME = 'User';
export const USER_TABLE = 'users';

export class UserModel extends Model {
  static associate(models: any) {
    // define association here
  }
  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: USER_MODEL_NAME,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}

export const UserModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
