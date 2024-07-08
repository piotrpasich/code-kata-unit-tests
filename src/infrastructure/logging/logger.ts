import * as bunyan from 'bunyan'
import { LogLevel } from 'bunyan'

export const logger = bunyan.createLogger({
  name: 'weather-app',
  level: <LogLevel> (process.env.LOG_LEVEL || 'info')
});
