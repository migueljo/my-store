import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

import {
  CUSTOMER_TABLE_NAME,
  CustomerModelSchema,
} from '../../api/customer/customers.model.js';

export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable(CUSTOMER_TABLE_NAME, CustomerModelSchema);
};
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable(CUSTOMER_TABLE_NAME);
};
