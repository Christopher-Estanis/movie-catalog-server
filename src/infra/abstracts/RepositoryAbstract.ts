export abstract class RepositoryAbstract<T> {
  abstract findBy (option): Promise<Array<T> | undefined>
  abstract findOne (data: any): Promise<T | undefined>
  abstract findById (id?: string): Promise<T | undefined>
  abstract save (entity: Partial<T>): Promise<any>
}
