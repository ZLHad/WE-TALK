import { ResponseType, API_PREFIX, RegisterDTO, LoginDTO, UserContextData } from '@we-talk/common'
import { request } from '../config/axios.config'

export const register = (data: RegisterDTO) =>
  request.post<ResponseType<{}>>(`${API_PREFIX}/register`, data)

export const login = (data: LoginDTO) =>
  request.post<ResponseType<UserContextData>>(`${API_PREFIX}/login`, data)
