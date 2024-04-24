/* eslint-disable @typescript-eslint/unbound-method */
import { body } from 'express-validator'

import AuthenticationController from '../../domain/Authentication/AuthenticationController'
import { RoutesAbstract } from '../abstracts/RoutesAbstract'

export class AuthenticationRoutes extends RoutesAbstract {
  defaultPath: string = '/authentication'

  constructor () {
    super([
      {
        method: 'post',
        path: '/signin',
        controller: AuthenticationController.signin,
        middlewares: [],
        validation: [
          body('email').isEmail(),
          body('password').isStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        ]
      }
    ])
  }
}

export default new AuthenticationRoutes()
