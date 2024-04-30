import express, { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import http from 'http'

import { ErrorAbstract } from '../../infra/abstracts/ErrorAbstract'
import { RoutesAbstract } from '../../infra/abstracts/RoutesAbstract'
import { DynamicErrorResponse, InternalServerErrorResponse, InvalidFieldsResponse } from '../HttpResponse/ErrorResponse'
import ConsoleAdapter from './ConsoleAdapter'
import TypeORMAdapter from './TypeORMAdapter'

export class ExpressAdapter {
  private readonly app: express.Application
  private readonly server: http.Server

  constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
  }

  public async startServer (port: number): Promise<void> {
    try {
      await TypeORMAdapter.dataSource.initialize()
      this.server.listen(port, () => {
        ConsoleAdapter.info(`Server is running on port ${port}`)
      })
    } catch (error) {
      ConsoleAdapter.error('Failed to start server:', error)
      throw error
    }
  }

  public setupEncoders () {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  public setupRoutes (router: RoutesAbstract) {
    router.routes.forEach(route => {
      const { method, path, validation, controller, middlewares } = route

      this.app[method](path, ...middlewares, ...validation, async (request: Request, response: Response, next: NextFunction) => {
        try {
          const errors = validationResult(request)
          if (!errors.isEmpty()) {
            return new InvalidFieldsResponse(response, errors.array().map((error: any) => ({
              type: error.type,
              msg: error.msg,
              path: error.path,
              location: error.location
            }))).sendResponse()
          }

          const result = await controller(request, response, next)
          return result.sendResponse()
        } catch (error) {
          if (error instanceof ErrorAbstract) {
            return new DynamicErrorResponse(response, error.message, error.code, error.data).sendResponse()
          }

          const internalServerErrorResponse = new InternalServerErrorResponse(response, error)

          return internalServerErrorResponse.sendResponse()
        }
      })
    })
  }
}

export const ExpressAdapterImp = new ExpressAdapter()
