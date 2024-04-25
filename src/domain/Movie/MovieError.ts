import { ErrorAbstract } from '../../infra/abstracts/ErrorAbstract'

export class MovieNotFoundError extends ErrorAbstract {
  constructor () {
    super(
      'Filme não encontrado!',
      'NotFound'
    )
  }
}
