import { Model, Sequelize, DataTypes } from 'sequelize';
import type { ModelAttributes } from 'sequelize';

export const USER_MODEL_NAME = 'User';
export const USER_TABLE = 'users';

export class UserModel extends Model {
  static associate(models: any) {
    // define association here
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
};
