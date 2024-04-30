import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral } from 'typeorm'

import { TypeORMEnvironment } from '../../infra/environments/TypeORMEnvironment'

export class TypeORMAdapter {
  private _dataSource?: DataSource
  private readonly _options: DataSourceOptions = TypeORMEnvironment

  get dataSource (): DataSource {
    if (!this._dataSource) {
      this._dataSource = new DataSource(this._options)
    }
    return this._dataSource
  }

  getRepository <T extends ObjectLiteral> (model: EntityTarget<T>) {
    return this.dataSource.getRepository<T>(model)
  }
}

export const TypeORMAdapterImp = new TypeORMAdapter()
