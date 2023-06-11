import Postgres from 'pg';
import type * as PostgresTypes from 'pg';

import { config } from '../config/config.js';

const { Pool } = Postgres;

const password = encodeURIComponent(config.dbPassword);
const user = encodeURIComponent(config.dbUser);
const URI = `postgres://${user}:${password}@${config.dbHost}:${config.dbHost}:${config.dbName}`;

export const pool: PostgresTypes.Pool = new Pool({
  connectionString: URI,
});

pool.on('error', (err) => {
  console.error('Unexpected error on pool', err);
});

export type Pool = PostgresTypes.Pool;
