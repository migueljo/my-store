import { DataTypes, Model, Sequelize } from 'sequelize';
import type { InitOptions, ModelAttributes } from 'sequelize';

export const CATEGORY_MODEL_NAME = 'Category';
export const CATEGORY_TABLE = 'categories';

export const CategoryModelSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export class CategoryModel extends Model {
  static associate(models: any) {
    // define association here
  }
  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: CATEGORY_MODEL_NAME,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}
