import axios from 'axios'
import { getWeather } from '../../../../src/application/handlers/WeatherHandler'
import { APIGatewayEvent } from 'aws-lambda'
import { getAxiosCallMock } from '../../../__mocks__/axios'
import { weatherRepositorySaveMock } from '../../../__mocks__/typeorm'
import { Weather } from '../../../../src/infrastructure/entities/Weather'

describe('getWeather handler', () => {
  const mockWeatherData = {
    main: {temp: 15, humidity: 80},
    weather: [{description: 'clear sky'}]
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return weather data successfully', async () => {
    getAxiosCallMock.mockResolvedValue({data: mockWeatherData})

    const response = await getWeather(<APIGatewayEvent>{})
    expect(getAxiosCallMock).toBeCalledTimes(1)
    expect(weatherRepositorySaveMock).toBeCalledWith(new Weather(
      expect.anything(),
      'gliwice',
      15,
      80,
      'clear sky'
    ))
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body!)).toEqual({
        description: 'clear sky',
        humidity: 80,
        location: 'gliwice',
        temperature: 15
      }
    )
  })

  it('should handle errors properly', async () => {
    getAxiosCallMock.mockRejectedValue(new Error('test'))
    const response = await getWeather(<APIGatewayEvent>{})
    expect(getAxiosCallMock).toBeCalledTimes(1)
    expect(weatherRepositorySaveMock).not.toBeCalled()
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(null)
  });
})
