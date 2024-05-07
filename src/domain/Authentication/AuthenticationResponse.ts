import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'

export class SigninResponse extends HttpResponseAbstract {
  constructor (token: string) {
    super(
      'Authenticação realizada com sucesso!',
      'Created',
      { token }
    )
  }
}

export class SigninUnauthorizedError extends HttpResponseAbstract {
  constructor () {
    super(
      'Email ou senha inválido, tente novamente!',
      'Unauthorized'
    )
  }
}
