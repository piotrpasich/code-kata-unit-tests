import { WeatherApiRepository } from '../../../src/infrastructure/repositories/WeatherApiRepository'
import { WeatherApiClient } from '../../../src/infrastructure/api/WeatherApiClient'
import { Weather } from '../../../src/domain/entities/Weather'
import { WeatherFetchError } from '../../../src/domain/errors/WeatherFetchError'
import { logger } from '../../../src/infrastructure/logging/logger'

jest.mock('../../../src/infrastructure/api/WeatherApiClient');
jest.mock('../../../src/infrastructure/logging/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('WeatherApiRepository', () => {
  let weatherApiClient: WeatherApiClient;
  let weatherApiRepository: WeatherApiRepository;

  beforeEach(() => {
    weatherApiClient = new WeatherApiClient();
    weatherApiRepository = new WeatherApiRepository(weatherApiClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data successfully', async () => {
    const mockWeatherData = {
      main: { temp: 15, humidity: 80 },
      weather: [{ description: 'clear sky' }],
    };
    (weatherApiClient.fetchWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    const location = 'London';
    const weather = await weatherApiRepository.getWeather(location);

    expect(weatherApiClient.fetchWeather).toHaveBeenCalledWith(location);
    expect(weather).toEqual(new Weather(location, 15, 80, 'clear sky'));
  });

  it('should log and throw WeatherFetchError when fetchWeather fails', async () => {
    (weatherApiClient.fetchWeather as jest.Mock).mockRejectedValue(new Error('API error'));

    const location = 'London';

    await expect(weatherApiRepository.getWeather(location)).rejects.toThrow(WeatherFetchError);
    expect(logger.error).toHaveBeenCalledWith('Error fetching weather data from API: API error');
  });
});
