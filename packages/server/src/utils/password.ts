import { User } from '@prisma/client'
import { SafeUserVO, UserVO } from '@we-talk/common'
import bcrypt from 'bcrypt'

export const saltRounds = 10

export const encryptPassword = async (raw: string) =>
  await bcrypt.hash(raw, saltRounds)

export const comparePassword = async (raw: string, encrypted: string) =>
  await bcrypt.compare(raw, encrypted)

export const makeUserSafe = (user: User) => {
  const { password, ...rest } = user
  return rest
}
