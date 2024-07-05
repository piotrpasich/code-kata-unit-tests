import { WeatherDbRepository as WeatherDbRepositoryInterface } from '../../domain/repositories/WeatherDbRepository';
import { Connection, Repository } from 'typeorm'
import { Weather as DomainWeather } from '../../domain/entities/Weather';
import { initializeDatabase } from '../database/database'
import { Weather } from '../entities/Weather'

export class WeatherDbRepository implements WeatherDbRepositoryInterface {
  private static connection: Connection;
  private weatherRepository: Repository<Weather>;

  private constructor() {
    this.weatherRepository = WeatherDbRepository.connection.getRepository(Weather);
  }

  static async initialize(): Promise<WeatherDbRepository> {
    if (!WeatherDbRepository.connection) {
      WeatherDbRepository.connection = await initializeDatabase();
    }
    return new WeatherDbRepository();
  }

  async saveWeather(domainWeather: DomainWeather): Promise<DomainWeather> {
    const weather: Weather = new Weather(
      new Date(),
      domainWeather.location,
      domainWeather.temperature,
      domainWeather.humidity,
      domainWeather.description
    );
    await this.weatherRepository.save(weather);

    return domainWeather
  }
}
