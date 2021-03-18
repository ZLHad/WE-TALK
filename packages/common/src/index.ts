import { ErrorStatus } from './ErrorStatus'
import { SafeUserVO, UserVO } from './VO'

export * from './VO'
export * from './DTO'
export * from './ErrorStatus'
export * from './SocketEvent'

export const API_PREFIX = '/api'

export type ResponseType<T = unknown> = {
  errMsg: string,
  status: number,
  res?: T
}

export const response = <T>(res?: T, status = ErrorStatus.Ok, errMsg = ''): ResponseType<T> => ({ errMsg, status, res })
export const emptyResponse = (status = 200, errMsg = ''): ResponseType => ({ status, errMsg })

export type UserContextData = SafeUserVO & { token: string }

export type JwtPayload = Pick<UserVO, 'username' | 'id'>

export const BEARER = 'Bearer '

export const createBearer = (token: string) => BEARER + token

export const extractToken = (fullToken?: string | null) => {
  if (fullToken && fullToken.length > BEARER.length) {
    return fullToken.substring(BEARER.length)
  }
  return null
}
