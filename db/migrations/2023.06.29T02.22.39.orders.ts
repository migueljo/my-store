import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

import {
  ORDER_TABLE_NAME,
  OrderModelSchema,
} from '../../api/orders/orders.model.js';

export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable(ORDER_TABLE_NAME, OrderModelSchema);
};
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable(ORDER_TABLE_NAME);
};
