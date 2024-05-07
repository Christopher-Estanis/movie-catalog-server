import { Request } from 'express'

import { JsonWebTokenAdapterImp } from '../../main/adapters/JsonWebTokenAdapter'
import { TypeORMAdapterImp } from '../../main/adapters/TypeORMAdapter'
import { Authentication } from './Authentication'
import { SigninDTO } from './AuthenticationDTO'
import { SigninResponse } from './AuthenticationResponse'
import { AuthenticationService } from './AuthenticationService'

class AuthenticationController {
  private readonly authenticationRepository = TypeORMAdapterImp.getRepository<Authentication>(Authentication)

  get authenticationService () {
    return new AuthenticationService(this.authenticationRepository, JsonWebTokenAdapterImp)
  }

  async signin (request: Request) {
    const token = await this.authenticationService.signin(request.body as SigninDTO)

    return new SigninResponse(token)
  }
}

export default new AuthenticationController()
