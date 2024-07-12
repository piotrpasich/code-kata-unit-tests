import { getWeatherServiceConfig } from '../../../src/infrastructure/configs/WeatherServiceConfig'

describe('getWeatherServiceConfig', () => {

  beforeEach(() => {
    jest.resetModules(); // Clears the cache
  });

  it('should return the correct configuration from environment variables', () => {
    const config = getWeatherServiceConfig();

    expect(config).toEqual({
      apiKey: 'test-api-key',
      baseUrl: 'http://test-url.com',
    });
  });
});
