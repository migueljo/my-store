import { Sequelize } from 'sequelize';

import { config } from '../config/config.js';
import { setupModels } from './setup-models.js';

const password = encodeURIComponent(config.dbPassword);
const user = encodeURIComponent(config.dbUser);
const URI = `postgres://${user}:${password}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const sequelize = new Sequelize(URI, {
  logging: true,
  dialect: 'postgres',
});

setupModels(sequelize);

(async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
