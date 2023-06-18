import { config } from '../config/config.js';

const password = encodeURIComponent(config.dbPassword);
const user = encodeURIComponent(config.dbUser);
const URI = `postgres://${user}:${password}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const development = {
  url: URI,
  dialect: 'postgres',
  logging: true,
};

export const production = {
  url: URI,
  dialect: 'postgres',
};
