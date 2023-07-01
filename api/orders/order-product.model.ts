import type { Sequelize, ModelAttributes, InitOptions } from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { ORDER_TABLE_NAME } from './orders.model.js';
import { PRODUCT_TABLE_NAME } from '../products/products.model.js';

export const ORDER_PRODUCT_MODEL_NAME = 'OrderProduct';
export const ORDER_PRODUCT_TABLE_NAME = 'orders-products';

export const OrderProductModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'order_id',
    unique: true,
    references: {
      model: ORDER_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'product_id',
    unique: true,
    references: {
      model: PRODUCT_TABLE_NAME,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
};

export class OrderProductModel extends Model {
  static associate(sequelize: Sequelize): void {
    // Associations
  }

  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE_NAME,
      modelName: ORDER_PRODUCT_MODEL_NAME,
      timestamps: false,
    };
  }
}
