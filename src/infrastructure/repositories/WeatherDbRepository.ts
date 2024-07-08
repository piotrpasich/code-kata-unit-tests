import { WeatherDbRepository as WeatherDbRepositoryInterface } from '../../domain/repositories/WeatherDbRepository';
import { Repository } from 'typeorm'
import { Weather as DomainWeather } from '../../domain/entities/Weather';
import { Weather } from '../entities/Weather'
import { Database } from '../database/Database'

export class WeatherDbRepository implements WeatherDbRepositoryInterface {
  private static database: Database;
  private weatherRepository: Repository<Weather>;

  private constructor() {
    this.weatherRepository = WeatherDbRepository.database.getDataSource().getRepository(Weather);
  }

  static async initialize(): Promise<WeatherDbRepository> {
    if (!WeatherDbRepository.database) {
      WeatherDbRepository.database = await Database.getInstance();
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
