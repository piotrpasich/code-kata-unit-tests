import { ConfigurationError } from '../../domain/errors/ConfigurationError'
import { logger } from '../logging/logger'

export const getWeatherServiceConfig = () => {
  if (!process.env.WEATHER_SERVICE_API_KEY || !process.env.WEATHER_SERVICE_API_URL) {
    logger.error('Missing configuration for Weather service')
    throw new ConfigurationError('Missing configuration for Weather service')
  }
  return {
    apiKey: <string>process.env.WEATHER_SERVICE_API_KEY,
    baseUrl: <string>process.env.WEATHER_SERVICE_API_URL
  };
};
