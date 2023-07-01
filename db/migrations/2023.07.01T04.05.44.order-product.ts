import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

import {
  ORDER_PRODUCT_TABLE_NAME,
  OrderProductModelSchema,
} from '../../api/orders/order-product.model.js';

export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable(
    ORDER_PRODUCT_TABLE_NAME,
    OrderProductModelSchema,
  );
};
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable(ORDER_PRODUCT_TABLE_NAME);
};
