import bcrypt from 'bcrypt'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('authentications')
export class Authentication {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  constructor (id: string, email: string, password: string) {
    this.id = id
    this.email = email
    this.password = password
  }

  @BeforeInsert()
  generateId () {
    if (!this.id) this.id = v4()
  }

  @BeforeInsert()
  async hashPassword () {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }

  async isValidPassword (password: string) {
    return await bcrypt.compare(password, this.password)
  }
}
