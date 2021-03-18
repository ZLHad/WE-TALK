
/**
 * Enums
 */

export enum MessageTypeEnum {
  PlanText = 'PlanText'
}

export enum RelationshipStatusEnum {
  None = 'None',
  Friend = 'Friend',
  Pending = 'Pending',
  Black = 'Black'
}

/**
 * Model Message
 */

export type MessageVO = {
  id: number
  fromUserId: number
  toUserId: number
  type: MessageTypeEnum
  content: string
  createdAt: string
  updatedAt: string
}

/**
 * Model Relationship
 */

export type RelationshipVO = {
  id: number
  fromUserId: number
  toUserId: number
  status: RelationshipStatusEnum
  createdAt: string
  updatedAt: string
}

/**
 * Model User
 */

export type UserVO = {
  id: number
  username: string
  password: string
  avatar: string | null
  nickname: string | null
  intro: string | null
  createdAt: string
  updatedAt: string
}

export type SafeUserVO = Omit<UserVO, 'password'>
