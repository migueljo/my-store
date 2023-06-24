import { DataTypes, QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
import { CUSTOMER_TABLE_NAME } from '../../api/customer/customers.model.js';
import { USER_TABLE_NAME } from '../../api/users/users.model.js';

export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.changeColumn(CUSTOMER_TABLE_NAME, 'user_id', {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    field: 'user_id',
    references: {
      model: USER_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });
};

export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.changeColumn(CUSTOMER_TABLE_NAME, 'user_id', {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
    field: 'user_id',
    references: {
      model: USER_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });
};
