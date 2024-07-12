import { createConnection, DataSource } from 'typeorm'
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config'

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
    const options: DataSourceOptions = {
      type: 'mysql', // or your database type
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
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
