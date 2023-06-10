import Postgres from 'pg';
import * as PostgresTypes from 'pg';

const { Client } = Postgres;

export async function getConnection(): Promise<PostgresTypes.Client> {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'miguel',
    password: 'miguel123',
    database: 'my_store',
  });

  await client.connect();

  return client;
}
