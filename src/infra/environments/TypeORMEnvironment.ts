import { DataSourceOptions } from 'typeorm'

import { Authentication } from '../../domain/Authentication/Authentication'

export const TypeORMEnvironment: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Authentication],
  migrations: [
    'src/infra/migration/*.ts'
  ],
  subscribers: []
}
