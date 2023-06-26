import { DataTypes, Model } from 'sequelize';
import type { InitOptions, ModelAttributes } from 'sequelize';
import { sequelize } from '../../libs/sequelize.js';

export const CATEGORY_MODEL_NAME = 'Category';
export const CATEGORY_TABLE_NAME = 'categories';

export const CategoryModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
};

export class CategoryModel extends Model {
  static associate(): void {
    this.hasMany(sequelize.models.Product, {
      // Field category key in the Product table
      foreignKey: 'categoryId',
      as: 'product',
    });
  }

  static config(): InitOptions {
    return {
      sequelize,
      tableName: CATEGORY_TABLE_NAME,
      modelName: CATEGORY_MODEL_NAME,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}
