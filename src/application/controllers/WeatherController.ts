import { WeatherService } from '../services/WeatherService';

export class WeatherController {
  constructor(
    private weatherService: WeatherService
  ) {}

  async updateWeather(location: string) {
    return this.weatherService.fetchAndSaveWeather(location);
  }
}
