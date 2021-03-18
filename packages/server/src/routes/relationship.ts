import { RelationshipStatus } from '@prisma/client'
import { API_PREFIX, RelationshipDTO, response } from '@we-talk/common'
import { FastifyPluginCallback } from 'fastify'
import { findRelationshipBetween, findRelationshipWith } from '../services/relationship.service'
import { notBlank } from '../utils/dataParser'
import { jwtOpts } from '../utils/jwtUtils'
import { prisma } from '../utils/prisma'

export const relationshipRouterPlugin: FastifyPluginCallback = async (server) => {
  /**
   * [POST /api/relationship] 新建或修改关系
   *
   * TODO: 从单项选择优化成双向选择
   */
  server.post<{Body: RelationshipDTO}>(`${API_PREFIX}/relationship`, jwtOpts, async ({ body }) => {
    const relationship = await findRelationshipBetween(body.fromUserId, body.toUserId)
    if (relationship) {
      await prisma.relationship.update({ data: { status: body.status }, where: { id: relationship.id } })
    } else {
      await prisma.relationship.create({ data: body })
    }
    return response()
  })

  /**
   * [GET /api/relationship] 查找关系
   */
  server.get<{Querystring: {userId?: string, status: RelationshipStatus}}>(`${API_PREFIX}/relationship`, jwtOpts,
    async ({ query, user }) => {
      const userId = notBlank(query.userId) ? Number(query.userId) : user?.id !!
      const relationships = await findRelationshipWith(userId, query.status)
      return response(relationships)
    })
}
