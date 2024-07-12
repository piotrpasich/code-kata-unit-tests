import { WEATHER_SERVICE_API_KEY, WEATHER_SERVICE_API_URL } from '../config'

export const getWeatherServiceConfig = () => {
  return {
    apiKey: WEATHER_SERVICE_API_KEY,
    baseUrl: WEATHER_SERVICE_API_URL
  };
};
