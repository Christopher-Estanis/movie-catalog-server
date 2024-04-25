import { Response } from 'express'

import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'

export class SigninResponse extends HttpResponseAbstract {
  constructor (response: Response, token: string) {
    super(
      response,
      'Authenticação realizada com sucesso!',
      'Created',
      { token }
    )
  }
}
