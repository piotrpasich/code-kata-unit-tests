import { WeatherApiRepository as WeatherApiRepositoryInterface } from '../../domain/repositories/WeatherApiRepository';
import { Weather } from '../../domain/entities/Weather';
import { WeatherApiClient } from '../api/WeatherApiClient';
import { WeatherFetchError } from '../../domain/errors/WeatherFetchError'
import { logger } from '../logging/logger'

export class WeatherApiRepository implements WeatherApiRepositoryInterface {
  constructor(private apiClient: WeatherApiClient) {}

  async getWeather(location: string): Promise<Weather> {
    try {
      const data = await this.apiClient.fetchWeather(location);
      return new Weather(
        location,
        data.main.temp,
        data.main.humidity,
        data.weather[0].description
      );
    } catch (error) {
      logger.error(`Error fetching weather data from API: ${error.message}`);
      throw new WeatherFetchError('Error fetching weather data from API');
    }
  }
}
