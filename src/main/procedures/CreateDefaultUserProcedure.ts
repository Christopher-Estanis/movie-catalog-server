import { Authentication } from '../../domain/Authentication/Authentication'
import TypeORMAdapter from '../adapters/TypeORMAdapter'

export const CreateDefaultUserProcedure = async () => {
  const authentication = new Authentication()

  authentication.email = 'desafio@gmail.com'
  authentication.password = 'Senha@123'

  const authenticationRepository = TypeORMAdapter.getRepository<Authentication>(Authentication)

  const existsUser = await authenticationRepository.existsBy({ email: authentication.email })

  if (!existsUser) await authenticationRepository.insert(authentication)
}
