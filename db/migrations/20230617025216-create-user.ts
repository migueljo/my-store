import { QueryInterface, DataTypes, Sequelize } from 'sequelize';
import {
  UserModel,
  USER_TABLE,
  UserModelSchema,
} from '../../api/users/users.model.js';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: QueryInterface,
    Sequelize: Sequelize,
  ): Promise<void> {
    await queryInterface.createTable(USER_TABLE, { id: DataTypes.UUID });
  },

  async down(
    queryInterface: QueryInterface,
    Sequelize: Sequelize,
  ): Promise<void> {
    queryInterface.dropTable(USER_TABLE);
  },
};
