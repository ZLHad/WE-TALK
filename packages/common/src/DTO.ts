import { MessageVO, RelationshipVO, UserVO } from './VO'

export type RegisterDTO = Pick<UserVO, 'avatar' | 'username' | 'password' | 'nickname' | 'intro'>
export type LoginDTO = Pick<UserVO, 'username' | 'password'>
export type UpdateUserDTO = Pick<UserVO, 'id' | 'password' | 'avatar' | 'nickname' | 'intro'>
export type RelationshipDTO = Pick<RelationshipVO, 'fromUserId' | 'toUserId' | 'status'>
export type SentMessageDTO = Pick<MessageVO, 'toUserId' | 'type' | 'content'>
