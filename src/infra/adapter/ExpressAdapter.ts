import express, { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import http from 'http'

import { RoutesAbstract } from '../abstract/RoutesAbstract'
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
      this.setupEncoders()

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
    router.routes.forEach(route => {
      const { method, path, validation, controller, middlewares } = route

      this.app[method](path, ...middlewares, ...validation, async (req: Request, res: Response, next: NextFunction) => {
        try {
          const errors = validationResult(req)
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
          }

          // Execute controller action
          const result = await controller(req, res, next)
          res.json(result)
        } catch (error) {
          res.json(error)
        }
      })
    })
  }
}

export default new ExpressAdapter()
