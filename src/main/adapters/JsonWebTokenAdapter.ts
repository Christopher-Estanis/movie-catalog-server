import jwt from 'jsonwebtoken'

import { JWT_OPTIONS, JWT_SECRET } from '../../infra/environments/JWTEnvironment'

class JsonWebTokenAdapter {
  sign (payload: object): string {
    return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS)
  }
}

export default JsonWebTokenAdapter
