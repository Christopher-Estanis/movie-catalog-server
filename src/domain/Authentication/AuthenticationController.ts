import { Request, Response } from 'express'

import { InternalServerErrorResponse } from '../../main/HttpResponse/InternalServerErrorResponse'

class AuthenticationController {
  async signin (request: Request, response: Response) {
    return new InternalServerErrorResponse(response)
  }
}

export default new AuthenticationController()
