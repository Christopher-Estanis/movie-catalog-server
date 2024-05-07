import { Request } from 'express'

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

  async create (request: Request) {
    const movie = await this.movieService.create(request.body as CreateMovieDTO)

    return new CreateMovieResponse(movie)
  }

  async list () {
    const movies = await this.movieService.list()

    return new ListMovieResponse(movies)
  }

  async findById (request: Request) {
    const movie = await this.movieService.findById(request.params.id)

    return new FindMovieResponse(movie)
  }

  async update (request: Request) {
    request.body.id = request.params.id

    const updatedMovie = await this.movieService.update(request.body as UpdateMovieDTO)

    return new UpdateMovieResponse(updatedMovie)
  }

  async delete (request: Request) {
    await this.movieService.delete(request.params.id)

    return new DeleteMovieResponse()
  }
}

export default new MovieController()
