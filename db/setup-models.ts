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
import { OrderModel, OrderModelSchema } from '../api/orders/orders.model.js';

export function setupModels(sequelize: Sequelize): void {
  try {
    UserModel.init(UserModelSchema, UserModel.config(sequelize));
    UserModel.associate(sequelize);

    CustomerModel.init(CustomerModelSchema, CustomerModel.config(sequelize));
    CustomerModel.associate(sequelize);

    ProductModel.init(ProductModelSchema, ProductModel.config(sequelize));
    ProductModel.associate(sequelize);

    CategoryModel.init(CategoryModelSchema, CategoryModel.config(sequelize));
    CategoryModel.associate(sequelize);

    OrderModel.init(OrderModelSchema, OrderModel.config(sequelize));
    OrderModel.associate(sequelize);
  } catch (error) {
    console.log('setupModels() - error', error);
  }
}
