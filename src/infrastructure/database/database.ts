import { createConnection, DataSource } from 'typeorm'
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'

dotenv.config();

export const initializeDatabase = async (): Promise<DataSource> => {
  const options: DataSourceOptions = {
    type: 'mysql', // or your database type
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../entities/*.js'],
    synchronize: true,
    logging: false,
    migrations: [__dirname + '/../migrations/*.js']
  };

  return await createConnection(options);
};
