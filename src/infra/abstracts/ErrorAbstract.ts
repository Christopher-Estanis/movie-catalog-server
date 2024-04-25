import { HttpCodes } from '../types/HttpTypes'

export abstract class ErrorAbstract extends Error {
  code?: HttpCodes
  data?: any

  constructor (message: string, code?: HttpCodes, data?: any) {
    super(message)
    this.code = code
    this.data = data
  }
}
