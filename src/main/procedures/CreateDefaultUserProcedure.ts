import { Authentication } from '../../domain/Authentication/Authentication'
import { TypeORMAdapterImp } from '../adapters/TypeORMAdapter'

export const CreateDefaultUserProcedure = async () => {
  const authentication = new Authentication()

  authentication.email = 'desafio@gmail.com'
  authentication.password = 'Senha@123'

  const authenticationRepository = TypeORMAdapterImp.getRepository<Authentication>(Authentication)

  const existsUser = await authenticationRepository.existsBy({ email: authentication.email })

  if (!existsUser) await authenticationRepository.insert(authentication)
}
