import { createConnection, DataSource } from 'typeorm'
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { logger } from '../logging/logger'
import { ConfigurationError } from '../../domain/errors/ConfigurationError'

dotenv.config();

export class Database {
  private static instance: Database
  private dataSource: DataSource

  private constructor(dataSource: DataSource) {
    this.dataSource = dataSource
  }
  public static async getInstance(): Promise<Database> {
    if (Database.instance) {
      return Database.instance
    }
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
      logger.error('Missing configuration for Weather service')
      throw new ConfigurationError('Missing configuration for Weather service')
    }
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

    Database.instance = new Database(await createConnection(options));

    return Database.instance
  }

  public getDataSource(): DataSource {
    return this.dataSource
  }
}
