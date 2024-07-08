export class WeatherFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherFetchError';
  }
}
