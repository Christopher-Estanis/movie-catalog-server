import express, { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import http from 'http'

import { HttpResponseAbstract } from '../../infra/abstracts/HttpResponseAbstract'
import { RoutesAbstract } from '../../infra/abstracts/RoutesAbstract'
import { InternalServerErrorResponse, InvalidFieldsResponse } from '../HttpResponse/ErrorResponse'
import { ConsoleAdapterImp } from './ConsoleAdapter'
import { TypeORMAdapterImp } from './TypeORMAdapter'

export class ExpressAdapter {
  private readonly app: express.Application
  private readonly server: http.Server

  constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
  }

  public async startServer (port: number): Promise<void> {
    try {
      await TypeORMAdapterImp.dataSource.initialize()
      this.server.listen(port, () => {
        ConsoleAdapterImp.info(`Server is running on port ${port}`)
      })
    } catch (error) {
      ConsoleAdapterImp.error('Failed to start server:', error)
      throw error
    }
  }

  public setupEncoders () {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  public setupRoutes (router: RoutesAbstract) {
    router.routes.forEach(route => {
      const { method, path, name, validation, controller, middlewares } = route

      this.app[method](path, ...middlewares, ...validation, async (request: Request, response: Response, next: NextFunction) => {
        try {
          const errors = validationResult(request)
          if (!errors.isEmpty()) {
            const invalidFields = errors.array().map((error: any) => ({
              type: error.type,
              msg: error.msg,
              path: error.path,
              location: error.location
            }))
            return new InvalidFieldsResponse(invalidFields).sendResponse(response)
          }

          const result = await controller[name](request, response, next)
          return result.sendResponse(response)
        } catch (error) {
          if (error instanceof HttpResponseAbstract) return error.sendResponse(response)

          const internalServerErrorResponse = new InternalServerErrorResponse(error as Error)

          return internalServerErrorResponse.sendResponse(response)
        }
      })
    })
  }
}

export const ExpressAdapterImp = new ExpressAdapter()
