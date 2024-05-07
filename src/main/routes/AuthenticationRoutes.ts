import { body } from 'express-validator'

import AuthenticationController from '../../domain/Authentication/AuthenticationController'
import { RoutesAbstract } from '../../infra/abstracts/RoutesAbstract'

export class AuthenticationRoutes extends RoutesAbstract {
  defaultPath: string = '/authentications'

  constructor () {
    super([
      {
        method: 'post',
        path: '/signin',
        controller: AuthenticationController,
        name: 'signin',
        middlewares: [],
        validation: [
          body('email').isEmail().withMessage('O endereço de email é inválido.'),
          body('password')
            .isStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
            .withMessage('A senha deve ter pelo menos 6 caracteres, 1 letra maiúscula, 1 número e 1 símbolo.')
        ]
      }
    ])
  }
}

export default new AuthenticationRoutes()
