import { Sequelize } from 'sequelize';

import { config } from '../config/config.js';

const password = encodeURIComponent(config.dbPassword);
const user = encodeURIComponent(config.dbUser);
const URI = `postgres://${user}:${password}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const sequelize = new Sequelize(URI, {
  logging: true,
  dialect: 'postgres',
});
