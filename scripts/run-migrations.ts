import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import { initializeDatabase } from '../src/infrastructure/database/database'

const runMigrations = async () => {
  console.log('initialize')
  const connection = await initializeDatabase();
  console.log('run migrations')
  await connection.runMigrations();
  await connection.close();
};

runMigrations().catch((error) => console.error('Error running migrations:', error));
