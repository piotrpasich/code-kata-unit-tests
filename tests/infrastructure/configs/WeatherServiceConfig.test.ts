import { getWeatherServiceConfig } from '../../../src/infrastructure/configs/WeatherServiceConfig'

describe('getWeatherServiceConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the cache
    process.env = { ...originalEnv }; // Copy the original environment variables
  });

  afterAll(() => {
    process.env = originalEnv; // Restore the original environment variables
  });

  it('should return the correct configuration from environment variables', () => {
    process.env.WEATHER_SERVICE_API_KEY = 'test-api-key';
    process.env.WEATHER_SERVICE_API_URL = 'http://test-url.com';

    const config = getWeatherServiceConfig();

    expect(config).toEqual({
      apiKey: 'test-api-key',
      baseUrl: 'http://test-url.com',
    });
  });

  it('should throw an error if WEATHER_SERVICE_API_KEY is not defined', () => {
    delete process.env.WEATHER_SERVICE_API_KEY;
    process.env.WEATHER_SERVICE_API_URL = 'http://test-url.com';

    expect(() => getWeatherServiceConfig()).toThrow();
  });

  it('should throw an error if WEATHER_SERVICE_API_URL is not defined', () => {
    process.env.WEATHER_SERVICE_API_KEY = 'test-api-key';
    delete process.env.WEATHER_SERVICE_API_URL;

    expect(() => getWeatherServiceConfig()).toThrow();
  });
});
