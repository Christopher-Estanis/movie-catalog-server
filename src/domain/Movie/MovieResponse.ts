import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'
import { Movie } from './Movie'

export class CreateMovieResponse extends HttpResponseAbstract {
  constructor (movie: Movie) {
    super(
      'Filme cadastrado com sucesso!',
      'Created',
      movie
    )
  }
}

export class UpdateMovieResponse extends HttpResponseAbstract {
  constructor (movie: Movie) {
    super(
      'Filme atualizado com sucesso!',
      'OK',
      movie
    )
  }
}

export class FindMovieResponse extends HttpResponseAbstract {
  constructor (movie: Movie) {
    super(
      'Filme encontrado com sucesso!',
      'OK',
      movie
    )
  }
}

export class DeleteMovieResponse extends HttpResponseAbstract {
  constructor () {
    super(
      'Filme removido!',
      'Accepted'
    )
  }
}

export class ListMovieResponse extends HttpResponseAbstract {
  constructor (test: any) {
    super(
      'Filme encontrado com sucesso!',
      'OK',
      test
    )
  }
}

export class MovieNotFoundError extends HttpResponseAbstract {
  constructor () {
    super(
      'Filme não encontrado!',
      'NotFound'
    )
  }
}
