import { Repository } from 'typeorm'

import JsonWebTokenAdapter from '../../main/adapters/JsonWebTokenAdapter'
import { Authentication } from './Authentication'
import { SigninDTO } from './AuthenticationDTOs'
import { SigninUnauthorizedError } from './AuthenticationErrors'

export class AuthenticationService {
  private readonly authenticationRepository: Repository<Authentication>
  private readonly jsonWebTokenAdapter: JsonWebTokenAdapter

  constructor (authenticationRepository: Repository<Authentication>, jsonWebTokenAdapter: JsonWebTokenAdapter) {
    this.authenticationRepository = authenticationRepository
    this.jsonWebTokenAdapter = jsonWebTokenAdapter
  }

  async signin (signinDTO: SigninDTO) {
    const authentication = await this.authenticationRepository.findOneBy({ email: signinDTO.email })

    const isAuthorizedToLogin = await authentication?.isValidPassword(signinDTO.password)
    if (!authentication || !isAuthorizedToLogin) throw new SigninUnauthorizedError()

    const token = this.generateToken(authentication)

    return {
      token
    }
  }

  private generateToken (authentication: Authentication) {
    return this.jsonWebTokenAdapter.sign({ userId: authentication.id })
  }
}
