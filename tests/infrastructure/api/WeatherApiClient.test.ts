import axios from 'axios';
import { WeatherApiClient } from '../../../src/infrastructure/api/WeatherApiClient'
import { getWeatherServiceConfig } from '../../../src/infrastructure/configs/WeatherServiceConfig'

// Mock the getWeatherServiceConfig function
jest.mock('../../../src/infrastructure/configs/WeatherServiceConfig', () => ({
  getWeatherServiceConfig: jest.fn().mockReturnValue({
    apiKey: 'test-api-key',
    baseUrl: 'http://test-url.com',
  }),
}));

jest.mock('axios');

describe('WeatherApiClient', () => {
  let weatherApiClient: WeatherApiClient;

  beforeEach(() => {
    weatherApiClient = new WeatherApiClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the correct API key and base URL', () => {
    const config = getWeatherServiceConfig();
    expect(weatherApiClient['apiKey']).toBe(config.apiKey);
    expect(weatherApiClient['baseUrl']).toBe(config.baseUrl);
  });

  it('should fetch weather data for a given location', async () => {
    const location = 'London';
    const mockWeatherData = { main: { temp: 15 }, weather: [{ description: 'clear sky' }] };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockWeatherData });

    const data = await weatherApiClient.fetchWeather(location);

    expect(axios.get).toHaveBeenCalledWith(`http://test-url.com?q=${location}&appid=test-api-key&units=metric`);
    expect(data).toEqual(mockWeatherData);
  });

  it('should throw an error if the API request fails', async () => {
    const location = 'London';
    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(weatherApiClient.fetchWeather(location)).rejects.toThrow('API error');
  });
});
