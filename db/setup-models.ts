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

export function setupModels(): void {
  console.log('setupModels() - before init');
  UserModel.init(UserModelSchema, UserModel.config());
  console.log('setupModels() - after init UserModel');
  CustomerModel.init(CustomerModelSchema, CustomerModel.config());
  console.log('setupModels() - after init CustomerModel');
  ProductModel.init(ProductModelSchema, ProductModel.config());
  console.log('setupModels() - after init ProductModel');
  CategoryModel.init(CategoryModelSchema, CategoryModel.config());
  console.log('setupModels() - after init CategoryModel');

  CustomerModel.associate();
  UserModel.associate();
  ProductModel.associate();
  CategoryModel.associate();

  console.log('setupModels() - after init');
}
