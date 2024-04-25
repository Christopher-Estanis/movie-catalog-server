import { Request, Response } from 'express'

import JsonWebTokenAdapter from '../../main/adapters/JsonWebTokenAdapter'
import TypeORMAdapter from '../../main/adapters/TypeORMAdapter'
import { Authentication } from './Authentication'
import { SigninDTO } from './AuthenticationDTOs'
import { SigninResponse } from './AuthenticationResponse'
import { AuthenticationService } from './AuthenticationService'

class AuthenticationController {
  async signin (request: Request, response: Response) {
    const authenticationRepository = TypeORMAdapter.getRepository<Authentication>(Authentication)
    const jsonWebTokenAdapter = new JsonWebTokenAdapter()
    const authenticationService = new AuthenticationService(authenticationRepository, jsonWebTokenAdapter)

    const signin = await authenticationService.signin(request.body as SigninDTO)

    return new SigninResponse(response, signin.token)
  }
}

export default new AuthenticationController()
