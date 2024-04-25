import { Repository } from 'typeorm'

import ConsoleAdapter from '../../main/adapters/ConsoleAdapter'
import { Movie } from './Movie'
import { CreateMovieDTO, ListMovieRequestDTO, ListMovieResponseDTO, UpdateMovieDTO } from './MovieDTO'
import { MovieNotFoundError } from './MovieError'

export class MovieService {
  private readonly movieRepository: Repository<Movie>

  constructor (movieRepository: Repository<Movie>) {
    this.movieRepository = movieRepository
  }

  async create (movieDTO: CreateMovieDTO): Promise<Movie> {
    const movie = Movie.createByMovieDTO(movieDTO)
    await this.movieRepository.insert(movie)
    return movie
  }

  async list (listMovieDTO: ListMovieRequestDTO): Promise<ListMovieResponseDTO> {
    const skip = (listMovieDTO.page - 1) * listMovieDTO.limit
    ConsoleAdapter.log(listMovieDTO, skip)

    const queryBuilder = this.movieRepository.createQueryBuilder('movie')

    const totalCount = await queryBuilder.getCount()
    const totalPages = Math.ceil(totalCount / listMovieDTO.limit)

    const movies = await queryBuilder
      .skip(skip)
      .take(listMovieDTO.limit)
      .orderBy(listMovieDTO.sort, listMovieDTO.order)
      .getMany()

    const hasNextPage = listMovieDTO.page < totalPages
    const hasBeforePage = listMovieDTO.page > 1

    return {
      movies,
      hasNextPage,
      hasBeforePage,
      totalPages
    }
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
