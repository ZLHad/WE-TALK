import { RelationshipStatus } from '@prisma/client'
import { prisma } from '../utils/prisma'

/**
 * 获得用户A与用户B之间的关系
 * @param fromUserId 用户A
 * @param toUserId 用户B
 * @returns 关系
 */
export async function findRelationshipBetween (fromUserId: number, toUserId: number) {
  return await prisma.relationship.findFirst({
    where: {
      OR: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    }
  })
}

/**
 * 获得对应的关系
 * @param useId 用户
 * @param status 关系
 * @returns 关系列表
 */
export async function findRelationshipWith (useId: number, status: RelationshipStatus) {
  return await prisma.relationship.findMany({
    where: {
      OR: [
        { fromUserId: useId, status },
        { toUserId: useId, status }
      ]
    }
  })
}

/**
 * 获得与该用户有特定关系的用户
 * @param userId 用户
 * @param status 关系
 * @returns 用户列表
 */
export async function findUserWith (userId: number, status?: RelationshipStatus) {
  return await prisma.user.findMany({
    where: {
      OR: [{
        relationshipSent: {
          some: { toUserId: userId, status }
        }
      }, {
        relationshipReceived: {
          some: { fromUserId: userId, status }
        }
      }]
    }
  })
}
