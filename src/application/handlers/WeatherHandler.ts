import 'reflect-metadata';
import { WeatherController } from '../controllers/WeatherController'
import { WeatherService } from '../services/WeatherService'
import { WeatherApiRepository } from '../../infrastructure/repositories/WeatherApiRepository'
import { WeatherApiClient } from '../../infrastructure/api/WeatherApiClient'
import { handlerWrapper } from './Handler'
import { WeatherDbRepository } from '../../infrastructure/repositories/WeatherDbRepository'

const getController = async (): Promise<WeatherController> => {
  const weatherApiClient: WeatherApiClient = new WeatherApiClient()
  const weatherApiRepository: WeatherApiRepository = new WeatherApiRepository(weatherApiClient)
  const weatherDbRepository: WeatherDbRepository = await WeatherDbRepository.initialize()
  const weatherService: WeatherService = new WeatherService(weatherApiRepository, weatherDbRepository)

  return new WeatherController(weatherService)
}

export const getWeather = handlerWrapper(async (event: any) => {
  const location = process.env.LOCATION || ''
  const weatherController: WeatherController = await getController()
  const weather = await weatherController.updateWeather(location)

  return {
    statusCode: 200,
    body: JSON.stringify(weather)
  }
})
