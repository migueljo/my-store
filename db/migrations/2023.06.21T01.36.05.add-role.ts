import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
import { USER_TABLE, UserModelSchema } from '../../api/users/users.model.js';

export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.addColumn(USER_TABLE, 'role', UserModelSchema.role);
};
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.removeColumn(USER_TABLE, 'role');
};
