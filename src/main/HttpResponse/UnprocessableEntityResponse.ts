import { Response } from 'express'

import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'

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
