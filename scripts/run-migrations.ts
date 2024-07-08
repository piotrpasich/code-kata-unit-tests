import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import { database } from '../src/infrastructure/database/Database'

const runMigrations = async () => {
  console.log('initialize')
  const connection = await database();
  console.log('run migrations')
  await connection.runMigrations();
  await connection.close();
};

runMigrations().catch((error) => console.error('Error running migrations:', error));
