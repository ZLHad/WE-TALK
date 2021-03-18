import { API_PREFIX, ErrorStatus, response, UpdateUserDTO } from '@we-talk/common'
import { FastifyPluginCallback } from 'fastify'
import { jwtOpts } from '../utils/jwtUtils'
import { prisma, PrismaErrorCode } from '../utils/prisma'
import { makeUserSafe } from '../utils/password'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { RelationshipStatus } from '@prisma/client'
import { findUserWith } from '../services/relationship.service'

export const userRouterPlugin: FastifyPluginCallback = async (server) => {
  /**
   * [GET /api/current] 获得当前用户信息
   */
  server.get(`${API_PREFIX}/current`, jwtOpts, async (req) => {
    const user = await prisma.user.findUnique({ where: { id: req.user?.id } })
    if (!user) {
      return response(user, ErrorStatus.NotFound, '用户不存在')
    }
    return response(makeUserSafe(user))
  })

  /**
   * [GET /api/user/:id] 获得用户信息
   */
  server.get<{Params: {id: string}}>(`${API_PREFIX}/user/:id`, jwtOpts, async (req) => {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } })
    if (!user) {
      return response(user, ErrorStatus.NotFound, '用户不存在')
    }
    return response(makeUserSafe(user))
  })

  /**
   * [PUT /api/user/:id] 更新用户信息
   */
  server.put<{Params: {id: string}, Body: UpdateUserDTO}>(`${API_PREFIX}/user/:id`, async (req) => {
    try {
      const user = await prisma.user.update({ where: { id: Number(req.params.id) }, data: req.body })
      return response(makeUserSafe(user))
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === PrismaErrorCode.RecordNotFound) {
          return response(null, ErrorStatus.NotFound, '用户不存在')
        }
      }
      throw e
    }
  })

  /**
   * [GET /api/current/related-user] 获取当前用户相关用户
   */
  server.get<{
    Params: { id: string }, Querystring: { status: RelationshipStatus }
  }>(`${API_PREFIX}/current/related-user`, jwtOpts, async (req) => {
    const users = await findUserWith(Number(req.user?.id !!), req.query.status)
    return response(users)
  })

  /**
   * [GET /api/user/:id/related-user] 获取用户
   */
  server.get<{
    Params: { id: string }, Querystring: { status: RelationshipStatus }
  }>(`${API_PREFIX}/user/:id/related-user`, jwtOpts, async (req) => {
    const users = await findUserWith(Number(req.params.id), req.query.status)
    return response(users)
  })
}
