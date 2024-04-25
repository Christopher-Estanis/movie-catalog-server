import { Request, Response } from 'express'

import TypeORMAdapter from '../../main/adapters/TypeORMAdapter'
import { Movie } from './Movie'
import { CreateMovieDTO, ListMovieRequestDTO, UpdateMovieDTO } from './MovieDTO'
import { CreateMovieResponse, DeleteMovieResponse, FindMovieResponse, ListMovieResponse, UpdateMovieResponse } from './MovieResponse'
import { MovieService } from './MovieService'

class MovieController {
  async create (request: Request, response: Response) {
    const movieRepository = TypeORMAdapter.getRepository<Movie>(Movie)
    const authenticationService = new MovieService(movieRepository)

    const movie = await authenticationService.create(request.body as CreateMovieDTO)

    return new CreateMovieResponse(response, movie)
  }

  async list (request: Request, response: Response) {
    const movieRepository = TypeORMAdapter.getRepository<Movie>(Movie)
    const movieService = new MovieService(movieRepository)

    const { page = 1, order = 'ASC', limit = 10, sort = 'id' } = request.query as unknown as ListMovieRequestDTO
    const movies = await movieService.list({
      order,
      sort,
      limit: Number(limit),
      page: Number(page)
    })

    return new ListMovieResponse(response, movies)
  }

  async findById (request: Request, response: Response) {
    const movieRepository = TypeORMAdapter.getRepository<Movie>(Movie)
    const movieService = new MovieService(movieRepository)

    const movie = await movieService.findById(request.params.id)

    return new FindMovieResponse(response, movie)
  }

  async update (request: Request, response: Response) {
    const movieRepository = TypeORMAdapter.getRepository<Movie>(Movie)
    const movieService = new MovieService(movieRepository)

    request.body.id = request.params.id

    const updatedMovie = await movieService.update(request.body as UpdateMovieDTO)

    return new UpdateMovieResponse(response, updatedMovie)
  }

  async delete (request: Request, response: Response) {
    const movieRepository = TypeORMAdapter.getRepository<Movie>(Movie)
    const movieService = new MovieService(movieRepository)

    await movieService.delete(request.params.id)

    return new DeleteMovieResponse(response)
  }
}

export default new MovieController()
