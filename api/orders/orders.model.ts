import type { Sequelize, ModelAttributes, InitOptions } from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { CUSTOMER_TABLE_NAME } from '../customer/customers.model.js';

export const ORDER_MODEL_NAME = 'Order';
export const ORDER_TABLE_NAME = 'orders';

export const OrderModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  total: {
    type: DataTypes.VIRTUAL,
    get(this: any): number {
      const products = this.products || [];
      return products.reduce(
        (acc: number, product: any) =>
          acc + product.price * product.OrderProduct.amount,
        0,
      );
    },
  },
};

export class OrderModel extends Model {
  static associate(sequelize: Sequelize): void {
    OrderModel.belongsTo(sequelize.models.Customer, {
      as: 'customer',
    });
    OrderModel.belongsToMany(sequelize.models.Product, {
      as: 'products',
      through: sequelize.models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: ORDER_TABLE_NAME,
      modelName: ORDER_MODEL_NAME,
      timestamps: false,
    };
  }
}
