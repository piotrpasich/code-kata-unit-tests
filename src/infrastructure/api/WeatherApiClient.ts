import axios from 'axios';
import { getWeatherServiceConfig } from '../configs/WeatherServiceConfig'

export class WeatherApiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = getWeatherServiceConfig().apiKey;
    this.baseUrl = getWeatherServiceConfig().baseUrl;
  }

  async fetchWeather(location: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}?q=${location}&appid=${this.apiKey}&units=metric`);
    return response.data;
  }
}
