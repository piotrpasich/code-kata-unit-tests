import { APIGatewayEvent, APIGatewayProxyCallback, Context } from 'aws-lambda'
import crypto from 'crypto'
import { logger } from '../../infrastructure/logging/logger'

export const handlerWrapper = (
  handler: (
    event: APIGatewayEvent,
    context?: Context,
    callback?: APIGatewayProxyCallback
  ) => Promise<any> | any
) => {

  const baseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS, PATCH, POST, PUT',
    'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, Accept-Language, bodweb'
  }

  return async (event: APIGatewayEvent, context?: Context, callback?: APIGatewayProxyCallback) => {
    try {
      const response = await handler(event, context, callback)

      const body = response ? JSON.stringify(response) : null

      let headers: object = {
        ...baseHeaders
      }

      if (body) {
        const bodyHash = createHash(body)

        headers = {
          ...baseHeaders,
          ETag: bodyHash
        }
      }

      return {
        statusCode: response && response.httpStatusCode ? response.httpStatusCode : (response ? 200 : 204),
        headers: headers,
        body: response && response.httpStatusCode === 201 ? undefined : body
      }
    } catch (error: any) {
      logger.error(error)
      let statusCode = error.statusCode || 500

      return {
        statusCode: statusCode,
        headers: baseHeaders,
        body: error.userMessage ? JSON.stringify({message: error.userMessage, errorCode: error.errorCode || 500}) : null
      }
    }
  }
}

const createHash = (value: string) => {
  return crypto.createHash('sha256').update(value, 'utf8').digest('base64')
}
