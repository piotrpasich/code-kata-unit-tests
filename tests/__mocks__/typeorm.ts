import { Repository } from 'typeorm'
import { Weather } from '../../src/infrastructure/entities/Weather'

const actualTypeorm = jest.requireActual('typeorm');
export const weatherRepositorySaveMock = jest.fn();
export const weatherRepositoryMock: jest.Mocked<Repository<Weather>> = {
  save: weatherRepositorySaveMock
} as unknown as jest.Mocked<Repository<Weather>>

module.exports = {
  ...actualTypeorm,
  createConnection: jest.fn().mockImplementation(() => ({
    getRepository: jest.fn().mockImplementation((instance) => {
      switch (instance.name) {
        case 'Weather':
          return weatherRepositoryMock
      }
    })
  })),
  weatherRepository: weatherRepositoryMock,
  weatherRepositorySaveMock
};
