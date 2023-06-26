import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

import {
  PRODUCT_TABLE_NAME,
  ProductModelSchema,
} from '../../api/products/products.model.js';
import {
  CATEGORY_TABLE_NAME,
  CategoryModelSchema,
} from '../../api/categories/categories.model.js';

export const up: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable(CATEGORY_TABLE_NAME, CategoryModelSchema);
  await queryInterface.createTable(PRODUCT_TABLE_NAME, ProductModelSchema);
};
export const down: MigrationFn<QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable(CATEGORY_TABLE_NAME);
  await queryInterface.dropTable(PRODUCT_TABLE_NAME);
};
