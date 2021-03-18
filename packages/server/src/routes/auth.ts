import { FastifyPluginCallback } from 'fastify'
import { LoginDTO, RegisterDTO, API_PREFIX, response, ErrorStatus, createBearer } from '@we-talk/common'
import { prisma, PrismaErrorCode } from '../utils/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { sign } from '../utils/jwtUtils'
import { comparePassword, encryptPassword, makeUserSafe } from '../utils/password'

export const authRouterPlugin: FastifyPluginCallback = async (server) => {
  /**
   * [/api/register] 注册
   */
  server.post<{Body: RegisterDTO}>(`${API_PREFIX}/register`, async (req, reply) => {
    try {
      const password = await encryptPassword(req.body.password)
      await prisma.user.create({ data: { ...req.body, password } })
      return response({})
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.UniqueConstants) {
          return response(error, ErrorStatus.Conflict, '用户名已注册')
        }
      }
      throw error
    }
  })

  /**
   * [/api/login] 登录
   */
  server.post<{Body: LoginDTO}>(`${API_PREFIX}/login`, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { username: req.body.username } })
    if (user) {
      const passwordSame = await comparePassword(req.body.password, user.password)
      if (!passwordSame) {
        return response(null, ErrorStatus.NotFound, '用户名或密码不存在')
      }

      const token = createBearer(sign({ id: user.id, username: user.username }))
      return response({ ...makeUserSafe(user), token })
    } else {
      return response(null, ErrorStatus.NotFound, '用户名或密码不存在')
    }
  })
}
