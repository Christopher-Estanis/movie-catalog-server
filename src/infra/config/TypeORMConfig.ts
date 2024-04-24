import { DataSourceOptions } from 'typeorm'

export const TypeORMConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'movie_catalog_db',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [
    'src/infra/migration/*.ts'
  ],
  subscribers: []
}
