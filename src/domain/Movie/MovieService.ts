/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Repository } from 'typeorm'

import { RedisAdapter } from '../../main/adapters/RedisAdapter'
import { Movie } from './Movie'
import { CreateMovieDTO, UpdateMovieDTO } from './MovieDTO'
import { MovieNotFoundError } from './MovieError'

export class MovieService {
  private readonly movieRepository: Repository<Movie>
  private readonly redisAdapter: RedisAdapter

  constructor (movieRepository: Repository<Movie>, redisAdapter: RedisAdapter) {
    this.movieRepository = movieRepository
    this.redisAdapter = redisAdapter
  }

  async create (movieDTO: CreateMovieDTO): Promise<Movie> {
    const movie = Movie.createByMovieDTO(movieDTO)
    await this.movieRepository.insert(movie)
    return movie
  }

  async list (): Promise<Array<Movie>> {
    const cachedMovies = await this.redisAdapter.get<Array<Movie> | null>('movies')
    if (cachedMovies) return cachedMovies

    const movies = await this.movieRepository.find()

    await this.redisAdapter.setSeconds('movies', movies, 60)

    return movies
  }

  async update (movieDTO: UpdateMovieDTO): Promise<Movie> {
    const movie = await this.findById(movieDTO.id)

    Object.assign(movie, movieDTO)
    await this.movieRepository.save(movie)

    return movie
  }

  async delete (id: string): Promise<Movie> {
    const movie = await this.findById(id)

    await this.movieRepository.remove(movie)

    return movie
  }

  async findById (id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id })

    if (!movie) throw new MovieNotFoundError()

    return movie
  }
}
