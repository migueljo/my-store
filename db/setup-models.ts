import { Sequelize } from 'sequelize';
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
  UserModel.init(UserModelSchema, UserModel.config(sequelize));
  ProductModel.init(ProductModelSchema, ProductModel.config(sequelize));
  CategoryModel.init(CategoryModelSchema, CategoryModel.config(sequelize));
  CustomerModel.init(CustomerModelSchema, CustomerModel.config(sequelize));

  CustomerModel.associate();
  UserModel.associate();
}
