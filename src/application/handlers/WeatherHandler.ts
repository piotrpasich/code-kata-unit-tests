import 'reflect-metadata';
import { WeatherController } from '../controllers/WeatherController'
import { WeatherService } from '../services/WeatherService'
import { WeatherApiRepository } from '../../infrastructure/repositories/WeatherApiRepository'
import { WeatherApiClient } from '../../infrastructure/api/WeatherApiClient'
import { handlerWrapper } from './Handler'
import { WeatherDbRepository } from '../../infrastructure/repositories/WeatherDbRepository'
import { Weather } from '../../domain/entities/Weather'

const getController = async (): Promise<WeatherController> => {
  const weatherApiClient: WeatherApiClient = new WeatherApiClient()
  const weatherApiRepository: WeatherApiRepository = new WeatherApiRepository(weatherApiClient)
  const weatherDbRepository: WeatherDbRepository = await WeatherDbRepository.initialize()
  const weatherService: WeatherService = new WeatherService(weatherApiRepository, weatherDbRepository)

  return new WeatherController(weatherService)
}

export const getWeather = handlerWrapper(async (event: any): Promise<Weather | null> => {
  const location = process.env.LOCATION || ''
  const weatherController: WeatherController = await getController()
  const weather: Weather = await weatherController.updateWeather(location)

  return weather
})
