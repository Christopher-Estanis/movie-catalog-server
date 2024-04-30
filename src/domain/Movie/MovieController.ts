import { Request, Response } from 'express'

import { RedisAdapterImp } from '../../main/adapters/RedisAdapter'
import { TypeORMAdapterImp } from '../../main/adapters/TypeORMAdapter'
import { Movie } from './Movie'
import { CreateMovieDTO, UpdateMovieDTO } from './MovieDTO'
import { CreateMovieResponse, DeleteMovieResponse, FindMovieResponse, ListMovieResponse, UpdateMovieResponse } from './MovieResponse'
import { MovieService } from './MovieService'

class MovieController {
  get movieService () {
    const movieRepository = TypeORMAdapterImp.getRepository<Movie>(Movie)
    return new MovieService(movieRepository, RedisAdapterImp)
  }

  async create (request: Request, response: Response) {
    const movie = await this.movieService.create(request.body as CreateMovieDTO)

    return new CreateMovieResponse(response, movie)
  }

  async list (request: Request, response: Response) {
    const movies = await this.movieService.list()

    return new ListMovieResponse(response, movies)
  }

  async findById (request: Request, response: Response) {
    const movie = await this.movieService.findById(request.params.id)

    return new FindMovieResponse(response, movie)
  }

  async update (request: Request, response: Response) {
    request.body.id = request.params.id

    const updatedMovie = await this.movieService.update(request.body as UpdateMovieDTO)

    return new UpdateMovieResponse(response, updatedMovie)
  }

  async delete (request: Request, response: Response) {
    await this.movieService.delete(request.params.id)

    return new DeleteMovieResponse(response)
  }
}

export default new MovieController()
