import { WeatherApiRepository as WeatherApiRepositoryInterface } from '../../domain/repositories/WeatherApiRepository';
import { Weather } from '../../domain/entities/Weather';
import { WeatherApiClient } from '../api/WeatherApiClient';

export class WeatherApiRepository implements WeatherApiRepositoryInterface {
  constructor(private apiClient: WeatherApiClient) {}

  async getWeather(location: string): Promise<Weather> {
    const data = await this.apiClient.fetchWeather(location);
    return new Weather(
      location,
      data.main.temp,
      data.main.humidity,
      data.weather[0].description
    );
  }
}
