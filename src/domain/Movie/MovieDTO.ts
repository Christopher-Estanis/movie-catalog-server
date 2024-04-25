import { Movie } from './Movie'

export interface CreateMovieDTO {
  title: string
  director: string
  year: number
  genre: string
  rating: number
}

export interface UpdateMovieDTO {
  id: string
  title: string
  director: string
  year: number
  genre: string
  rating: number
}

export interface ListMovieRequestDTO {
  sort: string
  order?: 'ASC' | 'DESC'
  page: number
  limit: number
}

export interface ListMovieResponseDTO {
  hasNextPage: boolean
  hasBeforePage: boolean
  totalPages: number
  movies: Array<Movie>
}
