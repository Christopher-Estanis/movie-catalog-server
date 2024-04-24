import { DataSource, DataSourceOptions } from 'typeorm'

import { TypeORMConfig } from '../config/TypeORMConfig'

export class TypeORMAdapter {
  private _dataSource?: DataSource
  private readonly _options: DataSourceOptions = TypeORMConfig

  get dataSource (): DataSource {
    if (!this._dataSource) {
      this._dataSource = new DataSource(this._options)
    }
    return this._dataSource
  }
}

export default new TypeORMAdapter()
