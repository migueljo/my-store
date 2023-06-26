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
    console.log('setupModels() - before init');
    UserModel.init(UserModelSchema, UserModel.config(sequelize));
    console.log('setupModels() - after init UserModel');
    CustomerModel.init(CustomerModelSchema, CustomerModel.config(sequelize));
    console.log('setupModels() - after init CustomerModel');
    ProductModel.init(ProductModelSchema, ProductModel.config(sequelize));
    console.log('setupModels() - after init ProductModel');
    CategoryModel.init(CategoryModelSchema, CategoryModel.config(sequelize));
    console.log('setupModels() - after init CategoryModel');

    CustomerModel.associate(sequelize);
    UserModel.associate(sequelize);
    ProductModel.associate(sequelize);
    CategoryModel.associate(sequelize);

    console.log('setupModels() - after init');
  } catch (error) {
    console.log('setupModels() - error', error);
  }
}
