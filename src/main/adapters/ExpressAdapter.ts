import express, { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import http from 'http'

import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'
import { RoutesAbstract } from '../../infra/abstracts/RoutesAbstract'
import { InternalServerErrorResponse } from '../HttpResponse/InternalServerErrorResponse'
import { InvalidFieldsResponse } from '../HttpResponse/UnprocessableEntityResponse'
import ConsoleAdapter from './ConsoleAdapter'

export class ExpressAdapter {
  private readonly app: express.Application
  private readonly server: http.Server

  constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
  }

  public async startServer (port: number): Promise<void> {
    try {
      this.server.listen(port, () => {
        ConsoleAdapter.log(`Server is running on port ${port}`)
      })
    } catch (error) {
      ConsoleAdapter.error('Failed to start server:', error)
      throw error
    }
  }

  private setupEncoders () {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  public setupRoutes (router: RoutesAbstract) {
    this.setupEncoders()

    router.routes.forEach(route => {
      const { method, path, validation, controller, middlewares } = route

      this.app[method](path, ...middlewares, ...validation, async (req: Request, res: Response, next: NextFunction) => {
        try {
          const errors = validationResult(req)
          if (!errors.isEmpty()) {
            return new InvalidFieldsResponse(res, errors.array().map((error: any) => ({
              type: error.type,
              msg: error.msg,
              path: error.path,
              location: error.location
            }))).sendResponse()
          }

          const result = await controller(req, res, next)
          return result.sendResponse()
        } catch (error) {
          if (error instanceof HttpResponseAbstract) return error.sendResponse()

          const internalServerErrorResponse = new InternalServerErrorResponse(res)

          return internalServerErrorResponse.sendResponse()
        }
      })
    })
  }
}

export default new ExpressAdapter()
