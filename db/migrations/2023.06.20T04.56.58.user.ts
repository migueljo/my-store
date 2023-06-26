import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

import {
  USER_TABLE_NAME,
  UserModelSchema,
} from '../../api/users/users.model.js';
import {
  CUSTOMER_TABLE_NAME,
  CustomerModelSchema,
} from '../../api/customer/customers.model.js';

export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable(USER_TABLE_NAME, UserModelSchema);
  await queryInterface.createTable(CUSTOMER_TABLE_NAME, CustomerModelSchema);
};
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable(CUSTOMER_TABLE_NAME);
  await queryInterface.dropTable(USER_TABLE_NAME);
};
