/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-unreachable */
import { UUID } from 'crypto'
import { DataSource, DataSourceOptions, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm'

import { RepositoryAbstract } from '../../infra/abstracts/RepositoryAbstract'
import { TypeORMEnvironment } from '../../infra/environments/TypeORMEnvironment'

export class TypeORMAdapter<T extends ObjectLiteral> extends RepositoryAbstract<T> {
  private _dataSource?: DataSource
  private _repository?: Repository<ObjectLiteral>
  private readonly _options: DataSourceOptions = TypeORMEnvironment

  constructor (private readonly model: T) {
    super()
  }

  get dataSource (): DataSource {
    if (!this._dataSource) {
      this._dataSource = new DataSource(this._options)
    }
    return this._dataSource
  }

  get repository () {
    if (!this._repository) this._repository = this.dataSource.getRepository(this.model as unknown as EntityTarget<ObjectLiteral>)
    return this._repository
  }

  async findBy (options: FindOptionsWhere<ObjectLiteral> | Array<FindOptionsWhere<ObjectLiteral>>): Promise<Array<T> | undefined> {
    const datas = await this.repository.findBy(options)

    if (!datas) return undefined

    return datas as Array<T>
  }

  async findOne (options: FindOptionsWhere<ObjectLiteral> | Array<FindOptionsWhere<ObjectLiteral>>): Promise<T | undefined> {
    const datas = await this.repository.findOneBy(options)

    if (!datas) return undefined

    return datas as T
  }

  async findById (id?: UUID): Promise<T | undefined> {
    const data = await this.repository.findOneBy({ id })

    if (!data) return undefined

    return data as T
  }

  async save (entity: T) {
    const data = await this.findById(entity?.id)

    if (data) {
      const entityToUpdate = Object.assign(entity, data)
      const updatedEntity = await this.repository.save(entityToUpdate)

      return updatedEntity
    }

    const createdEntity = await this.repository.insert(entity)
    return createdEntity
  }
}
