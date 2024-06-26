import { NextFunction, Request, Response } from 'express'
import { ValidationChain } from 'express-validator'

import { HttpResponseAbstract } from './HttpResponseAbstract'

export type RouteMethod = 'post' | 'get' | 'patch' | 'put' | 'delete'
export type RouteFunction = (req: Request, res: Response, next?: NextFunction) => Promise<HttpResponseAbstract>

export interface RouteConfig {
  method: RouteMethod
  path: string
  controller: Record<string, any>
  name: string
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
