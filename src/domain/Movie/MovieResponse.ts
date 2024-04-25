import { Response } from 'express'

import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'
import { Movie } from './Movie'

export class CreateMovieResponse extends HttpResponseAbstract {
  constructor (response: Response, movie: Movie) {
    super(
      response,
      'Filme cadastrado com sucesso!',
      'Created',
      movie
    )
  }
}

export class UpdateMovieResponse extends HttpResponseAbstract {
  constructor (response: Response, movie: Movie) {
    super(
      response,
      'Filme atualizado com sucesso!',
      'OK',
      movie
    )
  }
}

export class FindMovieResponse extends HttpResponseAbstract {
  constructor (response: Response, movie: Movie) {
    super(
      response,
      'Filme encontrado com sucesso!',
      'OK',
      movie
    )
  }
}

export class DeleteMovieResponse extends HttpResponseAbstract {
  constructor (response: Response) {
    super(
      response,
      'Filme removido!',
      'Accepted'
    )
  }
}

export class ListMovieResponse extends HttpResponseAbstract {
  constructor (response: Response, test: any) {
    super(
      response,
      'Filme encontrado com sucesso!',
      'OK',
      test
    )
  }
}
