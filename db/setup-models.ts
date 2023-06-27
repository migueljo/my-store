import type { Sequelize } from 'sequelize';

import { UserModel, UserModelSchema } from '../api/users/users.model.js';
import {
  ProductModel,
  ProductModelSchema,
} from '../api/products/products.model.js';
import {
  CategoryModel,
  CategoryModelSchema,
} from '../api/categories/categories.model.js';
import {
  CustomerModel,
  CustomerModelSchema,
} from '../api/customer/customers.model.js';

export function setupModels(sequelize: Sequelize): void {
  try {
    UserModel.init(UserModelSchema, UserModel.config(sequelize));
    CustomerModel.init(CustomerModelSchema, CustomerModel.config(sequelize));
    ProductModel.init(ProductModelSchema, ProductModel.config(sequelize));
    CategoryModel.init(CategoryModelSchema, CategoryModel.config(sequelize));

    CustomerModel.associate(sequelize);
    UserModel.associate(sequelize);
    ProductModel.associate(sequelize);
    CategoryModel.associate(sequelize);
  } catch (error) {
    console.log('setupModels() - error', error);
  }
}
