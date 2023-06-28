import type { InitOptions, ModelAttributes, Sequelize } from 'sequelize';
import { Model, DataTypes } from 'sequelize';

export const CUSTOMER_TABLE_NAME = 'customers';

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
    allowNull: true,
    unique: true,
    field: 'user_id',
    // User foreign key
    references: {
      model: 'users',
      key: 'id',
    },
    // If user id is updated, update user id here
    onUpdate: 'CASCADE',
    // If user is deleted, set user id to null
    onDelete: 'SET NULL',
  },
};

export class CustomerModel extends Model {
  static associate(sequelize: Sequelize): void {
    this.belongsTo(sequelize.models.User, { as: 'user' });
    this.hasMany(sequelize.models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    });
  }
  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE_NAME,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}
