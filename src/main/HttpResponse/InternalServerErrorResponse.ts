import { Response } from 'express'

import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'

export class InternalServerErrorResponse extends HttpResponseAbstract {
  constructor (response: Response, data?: any) {
    super(
      response,
      'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
      'InternalServerError',
      data
    )
  }
}
