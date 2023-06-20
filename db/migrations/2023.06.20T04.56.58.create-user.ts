import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
import { USER_TABLE, UserModelSchema } from '../../api/users/users.model.js';

export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable(USER_TABLE, UserModelSchema);
};
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable(USER_TABLE);
};
