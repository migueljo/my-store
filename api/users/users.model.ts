import { Model, Sequelize, DataTypes } from 'sequelize';
import type { InitOptions, ModelAttributes } from 'sequelize';

export const USER_MODEL_NAME = 'User';
export const USER_TABLE = 'users';

export class UserModel extends Model {
  // TODO: Read this https://sequelize.org/docs/v6/core-concepts/assocs/#creating-the-standard-relationships
  static associate(models: any) {
    // define association here
  }
  static config(sequelize: Sequelize): InitOptions {
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
