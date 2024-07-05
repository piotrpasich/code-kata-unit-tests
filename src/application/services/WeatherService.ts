import { Weather } from '../../domain/entities/Weather';
import { WeatherApiRepository } from '../../domain/repositories/WeatherApiRepository'
import { WeatherDbRepository } from '../../domain/repositories/WeatherDbRepository'

export class WeatherService {
  constructor(
    private weatherApiRepository: WeatherApiRepository,
    private weatherDbRepository: WeatherDbRepository
  ) {}

  async fetchAndSaveWeather(location: string): Promise<Weather> {
    const weather: Weather = await this.weatherApiRepository.getWeather(location);
    await this.weatherDbRepository.saveWeather(weather);

    return weather;
  }
}
