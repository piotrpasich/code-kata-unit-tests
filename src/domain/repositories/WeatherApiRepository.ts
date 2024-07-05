import { Weather } from '../entities/Weather';

export interface WeatherApiRepository {
  getWeather(location: string): Promise<Weather>;
}
