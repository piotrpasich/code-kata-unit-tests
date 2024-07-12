import * as dotenv from 'dotenv';
import { assertIsString } from 'serverless-esbuild/dist/helper'

dotenv.config();

assertIsString(process.env.DB_HOST)
assertIsString(process.env.DB_USER)
assertIsString(process.env.DB_PASSWORD)
assertIsString(process.env.DB_NAME)
export const DB_HOST: string = <string>process.env.DB_HOST
export const DB_USER: string = <string>process.env.DB_USER
export const DB_PASSWORD: string = <string>process.env.DB_PASSWORD
export const DB_NAME: string = <string>process.env.DB_NAME
export const DB_PORT: number = parseInt(process.env.DB_PORT || '3306', 10)

assertIsString(process.env.WEATHER_SERVICE_API_KEY)
assertIsString(process.env.WEATHER_SERVICE_API_URL)
assertIsString(process.env.WEATHER_SERVICE_LOCATION)

export const WEATHER_SERVICE_API_KEY: string = <string>process.env.WEATHER_SERVICE_API_KEY
export const WEATHER_SERVICE_API_URL: string = <string>process.env.WEATHER_SERVICE_API_URL
export const WEATHER_SERVICE_LOCATION: string = <string>process.env.WEATHER_SERVICE_LOCATION
