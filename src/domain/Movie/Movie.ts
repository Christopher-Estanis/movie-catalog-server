import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 } from 'uuid'

import { CreateMovieDTO } from './MovieDTO'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    title: string

  @Column({ nullable: true })
    director: string

  @Column({ nullable: true })
    year: number

  @Column({ nullable: true })
    genre: string

  @Column({ nullable: true })
    rating: number

  @BeforeInsert()
  generateId () {
    if (!this.id) this.id = v4()
  }

  constructor (
    title: string,
    director: string,
    year: number,
    genre: string,
    rating: number
  ) {
    this.title = title
    this.director = director
    this.year = year
    this.genre = genre
    this.rating = rating
  }

  static createByMovieDTO (movieDTO: CreateMovieDTO) {
    return new Movie(
      movieDTO.title,
      movieDTO.director,
      movieDTO.year,
      movieDTO.genre,
      movieDTO.rating
    )
  }
}
