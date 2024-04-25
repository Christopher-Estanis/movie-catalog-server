import { Response } from 'express'

import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'
import { HttpCodes } from '../../infra/types/HttpTypes'

export class DynamicErrorResponse extends HttpResponseAbstract {
  constructor (response: Response, message: string, code?: HttpCodes, error?: any) {
    super(
      response,
      message,
      code,
      { error }
    )
  }
}

export class InternalServerErrorResponse extends HttpResponseAbstract {
  constructor (response: Response, error?: any) {
    super(
      response,
      'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
      'InternalServerError',
      { error }
    )
  }
}

export class UnprocessableEntityResponse extends HttpResponseAbstract {
  constructor (response: Response, data) {
    super(
      response,
      'Campos inválidos',
      'UnprocessableEntity',
      data
    )
  }
}

export class InvalidFieldsResponse extends HttpResponseAbstract {
  constructor (response: Response, fields: Array<any>) {
    super(
      response,
      'Campos inválidos!',
      'UnprocessableEntity',
      { fields }
    )
  }
}
