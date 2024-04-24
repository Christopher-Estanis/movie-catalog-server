import { NextFunction, Request, Response } from 'express'
import { ValidationChain } from 'express-validator'

export type RouteMethod = 'post' | 'get' | 'patch' | 'put' | 'delete'
export type RouteFunction = (req: Request, res: Response, next?: NextFunction) => Promise<any>

export interface RouteConfig {
  method: RouteMethod
  path: string
  controller: RouteFunction
  middlewares: Array<RouteFunction>
  validation: Array<ValidationChain>
}

export abstract class RoutesAbstract {
  abstract defaultPath: string
  _routes: Array<RouteConfig>

  constructor (routes: Array<RouteConfig>) {
    this._routes = routes
  }

  get routes () {
    return this._routes.map(route => ({ ...route, path: this.defaultPath + route.path }))
  }
}
