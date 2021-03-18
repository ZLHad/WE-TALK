import { ErrorStatus, extractToken, JwtPayload, response } from '@we-talk/common'
import { RouteHandlerMethod, RouteShorthandOptions } from 'fastify'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { SECRET_KEY } from '../env'

export const sign = (payload: JwtPayload) =>
  jwt.sign(payload, SECRET_KEY)

export const verify = (token: string) =>
  jwt.verify(token, SECRET_KEY) as JwtPayload

export const jwtPreHandler: RouteHandlerMethod = async (req, reply) => {
  const unauthorizedError = () =>
    reply.send(response(null, ErrorStatus.Unauthorized, '登录已失效'))

  const { authorization } = req.headers
  const token = extractToken(authorization)
  if (token) {
    try {
      const payload = verify(token)
      req.user = payload
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        unauthorizedError()
      }
    }
  } else {
    reply.send(response(null, ErrorStatus.Unauthorized, '登录已失效'))
  }
}

export const jwtOpts: RouteShorthandOptions = { preHandler: jwtPreHandler }
