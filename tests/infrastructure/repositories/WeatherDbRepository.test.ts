import { WeatherDbRepository } from '../../../src/infrastructure/repositories/WeatherDbRepository';
import { Database } from '../../../src/infrastructure/database/Database';
import { Repository } from 'typeorm';
import { Weather as DomainWeather } from '../../../src/domain/entities/Weather';
import { Weather } from '../../../src/infrastructure/entities/Weather';
import Mock = jest.Mock

// Mock Database
jest.mock('../../../src/infrastructure/database/Database');

let mockSave: Mock = jest.fn();
// Mock typeorm
jest.mock('typeorm', () => {
  const actualTypeorm = jest.requireActual('typeorm');
  return {
    ...actualTypeorm,
    Repository: jest.fn().mockImplementation(() => ({
      save: mockSave,
    })),
  };
});

describe('WeatherDbRepository', () => {
  let database: Database;
  let weatherRepository: jest.Mocked<Repository<Weather>>;

  beforeEach(() => {
    weatherRepository = {
      save: mockSave,
    } as any;

    database = {
      getDataSource: jest.fn().mockReturnValue({
        getRepository: jest.fn().mockReturnValue(weatherRepository),
      }),
    } as any;

    (Database.getInstance as jest.Mock).mockResolvedValue(database);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize and return an instance of WeatherDbRepository', async () => {
    const instance = await WeatherDbRepository.initialize();

    expect(Database.getInstance).toHaveBeenCalled();
    expect(database.getDataSource().getRepository).toHaveBeenCalledWith(Weather);
    expect(instance).toBeInstanceOf(WeatherDbRepository);
  });

  it('should save weather data correctly', async () => {
    const weatherDbRepository = await WeatherDbRepository.initialize();
    const domainWeather = new DomainWeather(
      'New York',
      25,
      60,
      'Sunny'
    );

    await weatherDbRepository.saveWeather(domainWeather);

    expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
      date: expect.any(Date),
      location: 'New York',
      temperature: 25,
      humidity: 60,
      description: 'Sunny',
    }));
  });

  it('should throw an error if the save operation fails', async () => {
    const weatherDbRepository = await WeatherDbRepository.initialize();
    mockSave.mockRejectedValue(new Error('Save error'))

    const domainWeather = new DomainWeather(
      'New York',
      25,
      60,
      'Sunny'
    );

    await expect(weatherDbRepository.saveWeather(domainWeather)).rejects.toThrow('Save error');
  });
});
