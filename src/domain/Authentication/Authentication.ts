import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('authentications')
export class Authentication {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true })
    email: string

  @Column()
    password: string
}
