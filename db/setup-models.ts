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
import {
  OrderProductModel,
  OrderProductModelSchema,
} from '../api/orders/order-product.model.js';

export function setupModels(sequelize: Sequelize): void {
  try {
    CustomerModel.init(CustomerModelSchema, CustomerModel.config(sequelize));
    UserModel.init(UserModelSchema, UserModel.config(sequelize));
    ProductModel.init(ProductModelSchema, ProductModel.config(sequelize));
    CategoryModel.init(CategoryModelSchema, CategoryModel.config(sequelize));
    OrderModel.init(OrderModelSchema, OrderModel.config(sequelize));
    OrderProductModel.init(
      OrderProductModelSchema,
      OrderProductModel.config(sequelize),
    );

    UserModel.associate(sequelize);
    CustomerModel.associate(sequelize);
    ProductModel.associate(sequelize);
    CategoryModel.associate(sequelize);
    OrderModel.associate(sequelize);
    OrderProductModel.associate(sequelize);
  } catch (error) {
    console.log('setupModels() - error', error);
  }
}
