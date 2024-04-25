import { Response } from 'express'

import { HttpCodes } from '../types/HttpTypes'

export abstract class HttpResponseAbstract {
  response: Response
  message?: string
  code: number
  codeStr?: HttpCodes
  result?: any

  constructor (response: Response, message?: string, code?: HttpCodes, result?: any) {
    this.response = response
    this.message = message
    this.code = this.HttpCodeToNumber(code)
    this.codeStr = code
    this.result = result
  }

  private HttpCodeToNumber (code?: HttpCodes): number {
    switch (code) {
      case 'OK':
        return 200
      case 'Created':
        return 201
      case 'Accepted':
        return 202
      case 'NoContent':
        return 204
      case 'BadRequest':
        return 400
      case 'Unauthorized':
        return 401
      case 'Forbidden':
        return 403
      case 'NotFound':
        return 404
      case 'Conflict':
        return 409
      case 'ImATeapot':
        return 418
      case 'UnprocessableEntity':
        return 422
      case 'TooManyRequests':
        return 429
      case 'InternalServerError':
        return 500
      case 'BadGateway':
        return 502
      case 'ServiceUnavailable':
        return 503
      default:
        return 500
    }
  }

  sendResponse () {
    return this.response.status(this.code).json({
      status: this.codeStr,
      statusCode: this.code,
      message: this.message,
      ...(this.result ? { result: this.result } : {})
    })
  }
}
