import { DataTypes, Model } from 'sequelize';
import type { InitOptions, ModelAttributes, Sequelize } from 'sequelize';

export const PRODUCT_MODEL_NAME = 'Product';
export const PRODUCT_TABLE = 'products';

export const ProductModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  blocked: {
    type: DataTypes.BOOLEAN,
  },
};

export class ProductModel extends Model {
  static associate(models: any) {
    // define association here
  }
  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: PRODUCT_MODEL_NAME,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    };
  }
}
