import { body, param } from 'express-validator'

import MovieController from '../../domain/Movie/MovieController'
import { RoutesAbstract } from '../../infra/abstracts/RoutesAbstract'
import { AuthenticationMiddleware } from '../middlewares/AuthenticationMiddleware'

export class MovieRoutes extends RoutesAbstract {
  defaultPath: string = '/movies'

  constructor () {
    super([
      {
        path: '/',
        method: 'post',
        controller: MovieController.create,
        middlewares: [AuthenticationMiddleware],
        validation: movieBodyValidation
      },
      {
        path: '/',
        method: 'get',
        controller: MovieController.list,
        middlewares: [AuthenticationMiddleware],
        validation: []
      },
      {
        path: '/:id',
        method: 'get',
        controller: MovieController.findById,
        middlewares: [AuthenticationMiddleware],
        validation: movieIdParamValidation
      },
      {
        path: '/:id',
        method: 'put',
        controller: MovieController.update,
        middlewares: [AuthenticationMiddleware],
        validation: [...movieIdParamValidation, ...movieBodyValidation]
      },
      {
        path: '/:id',
        method: 'delete',
        controller: MovieController.delete,
        middlewares: [AuthenticationMiddleware],
        validation: movieIdParamValidation
      }
    ])
  }
}

const movieBodyValidation = [
  body('rating')
    .custom(value => (value >= 0) && (value <= 10))
    .withMessage('O rating deve estar entre 0 e 10.'),
  body('title')
    .isString()
    .withMessage('O título deve ser uma string.'),
  body('director')
    .isString()
    .withMessage('O diretor deve ser uma string.'),
  body('year')
    .isNumeric()
    .withMessage('O ano deve ser um número.'),
  body('genre')
    .isString()
    .withMessage('O gênero deve ser uma string.')
]

const movieIdParamValidation = [
  param('id')
    .isUUID()
    .withMessage('O ID deve ser um UUID.')
]

export default new MovieRoutes()
