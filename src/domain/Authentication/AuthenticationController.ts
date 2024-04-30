import { Request, Response } from 'express'

import { JsonWebTokenAdapterImp } from '../../main/adapters/JsonWebTokenAdapter'
import { TypeORMAdapterImp } from '../../main/adapters/TypeORMAdapter'
import { Authentication } from './Authentication'
import { SigninDTO } from './AuthenticationDTO'
import { SigninResponse } from './AuthenticationResponse'
import { AuthenticationService } from './AuthenticationService'

class AuthenticationController {
  get authenticationService () {
    const authenticationRepository = TypeORMAdapterImp.getRepository<Authentication>(Authentication)
    return new AuthenticationService(authenticationRepository, JsonWebTokenAdapterImp)
  }

  async signin (request: Request, response: Response) {
    const token = await this.authenticationService.signin(request.body as SigninDTO)

    return new SigninResponse(response, token)
  }
}

export default new AuthenticationController()
