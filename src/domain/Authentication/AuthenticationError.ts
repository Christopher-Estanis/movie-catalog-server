import { ErrorAbstract } from '../../infra/abstracts/ErrorAbstract'

export class SigninUnauthorizedError extends ErrorAbstract {
  constructor () {
    super(
      'Email ou senha inválido, tente novamente!',
      'Unauthorized'
    )
  }
}
