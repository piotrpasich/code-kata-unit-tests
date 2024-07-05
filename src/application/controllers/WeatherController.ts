import { WeatherService } from '../services/WeatherService';
import { Weather } from '../../domain/entities/Weather'

export class WeatherController {
  constructor(
    private weatherService: WeatherService
  ) {}

  async updateWeather(location: string) {
    return this.weatherService.fetchAndSaveWeather(location);
  }
}
