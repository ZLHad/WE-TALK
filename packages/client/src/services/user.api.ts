import { API_PREFIX, RelationshipStatusEnum, ResponseType, SafeUserVO } from '@we-talk/common'
import { request } from '../config/axios.config'

export const fetchCurrentUser = () =>
  request.get<ResponseType<SafeUserVO>>(`${API_PREFIX}/current`)

export const fetchCurrentUserRelated = (status: RelationshipStatusEnum) =>
  request.get<ResponseType<SafeUserVO[]>>(`${API_PREFIX}/current/related-user`, { params: { status } })
