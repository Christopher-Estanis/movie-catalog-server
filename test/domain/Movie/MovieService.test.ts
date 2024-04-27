/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { mock, MockProxy } from 'jest-mock-extended'
import { Repository } from 'typeorm'

import { Movie } from '../../../src/domain/Movie/Movie'
import { MovieNotFoundError } from '../../../src/domain/Movie/MovieError'
import { MovieService } from '../../../src/domain/Movie/MovieService'
import { RedisAdapter } from '../../../src/main/adapters/RedisAdapter'

const movieMock = {
  id: 'any_id',
  title: 'any_title',
  director: 'any_director',
  year: 2022,
  genre: 'any_genre',
  rating: 8
}

describe('MovieService', () => {
  let movieRepository: MockProxy<Repository<Movie>>
  let redisAdapter: MockProxy<RedisAdapter>
  let movieService: MovieService

  beforeEach(() => {
    movieRepository = mock<Repository<Movie>>()
    redisAdapter = mock<RedisAdapter>()
    movieService = new MovieService(movieRepository, redisAdapter)
  })

  describe('create', () => {
    it('should create a movie', async () => {
      const movie = Movie.createByMovieDTO(movieMock)

      movieRepository.insert.mockResolvedValueOnce({} as any)

      const result = await movieService.create(movieMock)

      expect(result).toStrictEqual(movie)
      expect(movieRepository.insert).toHaveBeenCalledWith(movie)
    })
  })

  describe('list', () => {
    it('should list all movies without caching', async () => {
      const movie = Movie.createByMovieDTO(movieMock)
      const movies: Array<Movie> = [movie]
      movieRepository.find.mockResolvedValueOnce(movies)
      redisAdapter.get.mockResolvedValueOnce(null)

      const result = await movieService.list()

      expect(result).toEqual(movies)
      expect(redisAdapter.get).toHaveBeenCalledTimes(1)
      expect(redisAdapter.get).toHaveBeenCalledWith('movies')
      expect(movieRepository.find).toHaveBeenCalledTimes(1)
      expect(movieRepository.find).toHaveBeenCalledWith()
    })

    it('should list all cached movies', async () => {
      const wrongMovie = Movie.createByMovieDTO({ director: 'a', genre: 'wrong', rating: 0, title: 'wrong', year: 2002 })
      const wrongMovies: Array<Movie> = [wrongMovie]
      movieRepository.find.mockResolvedValueOnce(wrongMovies)
      const movie = Movie.createByMovieDTO(movieMock)
      const movies: Array<Movie> = [movie]
      redisAdapter.get.mockResolvedValueOnce(movies)

      const result = await movieService.list()

      expect(result).toEqual(movies)
      expect(movieRepository.find).toHaveBeenCalledTimes(0)
      expect(redisAdapter.get).toHaveBeenCalledTimes(1)
      expect(redisAdapter.get).toHaveBeenCalledWith('movies')
    })
  })

  describe('update', () => {
    it('should update a movie', async () => {
      const movie = Movie.createByMovieDTO(movieMock)

      movieRepository.findOneBy.mockResolvedValueOnce(movie)
      movieRepository.save.mockResolvedValueOnce(movie)

      const result = await movieService.update(movieMock)

      expect(result).toBe(movie)
      expect(movieRepository.findOneBy).toHaveBeenCalledWith({ id: movieMock.id })
      expect(movieRepository.save).toHaveBeenCalledWith(movie)
    })

    it('should throw MovieNotFoundError if movie is not found', async () => {
      movieRepository.findOneBy.mockResolvedValueOnce(null)

      await expect(movieService.update(movieMock)).rejects.toThrow(MovieNotFoundError)
    })
  })

  describe('remove', () => {
    it('should remove a movie', async () => {
      const movie = Movie.createByMovieDTO(movieMock)

      movieRepository.findOneBy.mockResolvedValueOnce(movie)
      movieRepository.remove.mockResolvedValueOnce({} as any)

      const result = await movieService.delete(movieMock.id)

      expect(result).toBe(movie)
      expect(movieRepository.findOneBy).toHaveBeenCalledWith({ id: movieMock.id })
      expect(movieRepository.remove).toHaveBeenCalledWith(movie)
    })

    it('should throw MovieNotFoundError if movie is not found', async () => {
      movieRepository.findOneBy.mockResolvedValueOnce(null)

      await expect(movieService.delete(movieMock.id)).rejects.toThrow(MovieNotFoundError)
    })
  })

  describe('findById', () => {
    it('should find a movie by id', async () => {
      const movie = Movie.createByMovieDTO(movieMock)

      movieRepository.findOneBy.mockResolvedValueOnce(movie)

      const result = await movieService.findById(movieMock.id)

      expect(result).toBe(movie)
      expect(movieRepository.findOneBy).toHaveBeenCalledWith({ id: movieMock.id })
    })

    it('should throw MovieNotFoundError if movie is not found', async () => {
      const movieId = 'movieId'

      movieRepository.findOneBy.mockResolvedValueOnce(null)

      await expect(movieService.findById(movieId)).rejects.toThrow(MovieNotFoundError)
    })
  })
})
