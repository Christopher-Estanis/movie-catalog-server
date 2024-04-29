import { Movie } from '../../../src/domain/Movie/Movie'
import { CreateMovieDTO } from '../../../src/domain/Movie/MovieDTO'

describe('Movie', () => {
  it('should create a new movie instance with generated id when instantiated with constructor', () => {
    const title = 'Inception'
    const director = 'Christopher Nolan'
    const year = 2010
    const genre = 'Sci-Fi'
    const rating = 8.8

    const movie = new Movie(title, director, year, genre, rating)

    expect(movie.id).toBeUndefined()
    expect(movie.title).toBe(title)
    expect(movie.director).toBe(director)
    expect(movie.year).toBe(year)
    expect(movie.genre).toBe(genre)
    expect(movie.rating).toBe(rating)
  })

  it('should create a new movie instance with generated id when created with createByMovieDTO method', () => {
    const movieDTO: CreateMovieDTO = {
      title: 'The Shawshank Redemption',
      director: 'Frank Darabont',
      year: 1994,
      genre: 'Drama',
      rating: 9.3
    }

    const movie = Movie.createByMovieDTO(movieDTO)

    expect(movie.id).toBeUndefined()
    expect(movie.title).toBe(movieDTO.title)
    expect(movie.director).toBe(movieDTO.director)
    expect(movie.year).toBe(movieDTO.year)
    expect(movie.genre).toBe(movieDTO.genre)
    expect(movie.rating).toBe(movieDTO.rating)
  })

  it('should generate a new id before insertion if id is not provided', () => {
    const movie = new Movie('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime', 8.9)

    expect(movie.id).toBeUndefined()

    movie.generateId()

    expect(movie.id).toBeDefined()
  })
})
