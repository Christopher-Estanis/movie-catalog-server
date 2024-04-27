import jwt, { VerifyCallback } from 'jsonwebtoken'

import { JWT_OPTIONS, JWT_SECRET } from '../../infra/environments/JWTEnvironment'

export class JsonWebTokenAdapter {
  sign (payload: object): string {
    return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS)
  }

  verify (token: string, callback: VerifyCallback<any>) {
    jwt.verify(token, JWT_SECRET, callback)
  }
}

export const JsonWebTokenAdapterImp = new JsonWebTokenAdapter()
