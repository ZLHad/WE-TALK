import { JwtPayload } from '@we-talk/common'
import type { RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

declare module 'fastify' {
  // interface FastifyInstance {
  //   jwtHandler: RouteHandlerMethod,
  //   jwtOpts: RouteShorthandOptions
  // }

  interface FastifyRequest {
    user: JwtPayload | null
  }
}

declare module 'faker/locale/zh_CN' {
  export * from 'faker'
}

declare module 'socket.io' {
  interface Socket {
    user: JwtPayload | null
  }

}
