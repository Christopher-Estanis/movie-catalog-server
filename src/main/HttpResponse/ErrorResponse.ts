/* eslint-disable @typescript-eslint/no-useless-constructor */

import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'

export class InternalServerErrorResponse extends HttpResponseAbstract {
  constructor (error?: Error) {
    super(
      'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
      'InternalServerError',
      { error: error?.stack }
    )
  }
}

export class UnprocessableEntityResponse extends HttpResponseAbstract {
  constructor (data) {
    super(
      'Campos inválidos',
      'UnprocessableEntity',
      data
    )
  }
}

export class InvalidFieldsResponse extends HttpResponseAbstract {
  constructor (fields: Array<any>) {
    super(
      'Campos inválidos!',
      'UnprocessableEntity',
      { fields }
    )
  }
}
