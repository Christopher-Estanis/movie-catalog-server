import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'KXKW2Kkr'

export const JWT_OPTIONS: jwt.SignOptions = {
  expiresIn: '1h',
  algorithm: 'HS256'
}
