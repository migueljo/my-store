import Postgres from 'pg';
import type * as PostgresTypes from 'pg';

const { Pool } = Postgres;

export const pool: PostgresTypes.Pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'miguel',
  password: 'miguel123',
  database: 'my_store',
});

export type Pool = PostgresTypes.Pool;
