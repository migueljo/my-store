import { DataTypes, Model } from 'sequelize';
import type { InitOptions, ModelAttributes, Sequelize } from 'sequelize';

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
};

export class ProductModel extends Model {
  static associate(models: any) {
    // define association here
  }
  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: PRODUCT_TABLE_NAME,
      modelName: PRODUCT_MODEL_NAME,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    };
  }
}
