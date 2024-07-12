import { DataSource, createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { Database } from '../../../src/infrastructure/database/Database'
import { ConfigurationError } from '../../../src/domain/errors/ConfigurationError'
import { logger } from '../../../src/infrastructure/logging/logger'

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Mock logger
jest.mock('../../../src/infrastructure/logging/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

// Mock typeorm
jest.mock('typeorm', () => ({
  DataSource: jest.fn(),
  createConnection: jest.fn(),
}));

describe('Database', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the cache
    process.env = { ...originalEnv }; // Copy the original environment variables
  });

  afterEach(() => {
    process.env = originalEnv; // Restore the original environment variables
  });

  it('should create a database connection with correct options', async () => {
    const mockConnection = { isConnected: true } as unknown as DataSource;
    (createConnection as jest.Mock).mockResolvedValue(mockConnection);

    const database = await Database.getInstance();

    expect(createConnection).toHaveBeenCalledWith({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'weather',
      entities: [expect.stringContaining('/entities/*.js')],
      synchronize: true,
      logging: false,
      migrations: [expect.stringContaining('/migrations/*.js')],
    });
    expect(Database['instance']).toBeInstanceOf(Database);
    expect(Database['instance'].getDataSource()).toBe(mockConnection);
  });

  it('should return the same instance on multiple calls to getInstance', async () => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'root';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_NAME = 'weather';
    process.env.DB_PORT = '3306';

    const mockConnection = { isConnected: true } as unknown as DataSource;
    (createConnection as jest.Mock).mockResolvedValue(mockConnection);

    const instance1 = await Database.getInstance();
    const instance2 = await Database.getInstance();

    expect(instance1).toBe(instance2);
    expect(createConnection).toHaveBeenCalledTimes(1);
  });
});
