export const getWeatherServiceConfig = () => ({
  apiKey: <string> process.env.WEATHER_SERVICE_API_KEY,
  baseUrl: <string> process.env.WEATHER_SERVICE_API_URL
});
