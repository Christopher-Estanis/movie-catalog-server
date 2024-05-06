import jwt from 'jsonwebtoken'

import { JWT_OPTIONS, JWT_SECRET } from '../../infra/environments/JWTEnvironment'

export class JsonWebTokenAdapter {
  sign (payload: object): string {
    return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS)
  }

  verify (token: string): jwt.JwtPayload {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
  }
}

export const JsonWebTokenAdapterImp = new JsonWebTokenAdapter()
