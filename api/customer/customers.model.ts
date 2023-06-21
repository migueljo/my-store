import type { InitOptions, ModelAttributes, Sequelize } from 'sequelize';
import { Model, DataTypes } from 'sequelize';

export const CUSTOMER_TABLE = 'customers';

export class CustomerModel extends Model {
  static associate(models: any) {
    // define association here
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
};
