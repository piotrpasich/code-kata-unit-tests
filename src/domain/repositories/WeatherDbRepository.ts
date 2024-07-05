import { Weather } from '../entities/Weather';

export interface WeatherDbRepository {
  saveWeather(weather: Weather): Promise<Weather>;
}
