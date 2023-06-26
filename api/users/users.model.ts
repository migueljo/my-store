import { Model, DataTypes } from 'sequelize';
import type { InitOptions, ModelAttributes, Sequelize } from 'sequelize';

export const USER_MODEL_NAME = 'User';
export const USER_TABLE_NAME = 'users';

export const UserModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
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
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
};

export class UserModel extends Model {
  // TODO: Read this https://sequelize.org/docs/v6/core-concepts/assocs/#options
  static associate(sequelize: Sequelize): void {
    // Has one creates the foreign key in the target model (Customer in this case)
    this.hasOne(sequelize.models.Customer, {
      as: 'customer',
      foreignKey: 'userId',
    });
  }

  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: USER_TABLE_NAME,
      modelName: USER_MODEL_NAME,
      timestamps: false,
    };
  }
}
