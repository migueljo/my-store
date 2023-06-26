import { DataTypes, Model } from 'sequelize';
import type { InitOptions, ModelAttributes, Sequelize } from 'sequelize';
import { CATEGORY_TABLE_NAME } from '../categories/categories.model.js';
import { sequelize } from '../../libs/sequelize.js';

export const PRODUCT_MODEL_NAME = 'Product';
export const PRODUCT_TABLE_NAME = 'products';

export const ProductModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

export class ProductModel extends Model {
  static associate(): void {
    this.belongsTo(sequelize.models.Category, {
      as: 'category',
    });
  }

  static config(): InitOptions {
    return {
      sequelize,
      tableName: PRODUCT_TABLE_NAME,
      modelName: PRODUCT_MODEL_NAME,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    };
  }
}
