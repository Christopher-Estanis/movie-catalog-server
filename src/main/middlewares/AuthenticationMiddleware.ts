import { JsonWebTokenAdapter } from '../adapters/JsonWebTokenAdapter'

export const AuthenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido ou malformatado' })
  }

  const token: string = authHeader.split(' ')[1]

  const jsonWebTokenAdapter = new JsonWebTokenAdapter()

  jsonWebTokenAdapter.verify(token, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' })

    req.userId = decoded?.userId
    next()
  })
}
