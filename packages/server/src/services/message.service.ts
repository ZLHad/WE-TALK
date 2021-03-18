import { MessageVO } from '@we-talk/common'
import { prisma } from '../utils/prisma'

const defaultMessageCount = 5

export function findLastNMessagesEachUser (
  userId: number, messageCount = defaultMessageCount
): Promise<MessageVO[]> {
  // return prisma.message.findMany({
  //   where: {
  //     OR: [{ fromUserId: userId }, { toUserId: userId }]
  //   },
  //   take: -messageCount
  // })
  return prisma.$queryRaw`
    WITH ranked_messages AS (
      SELECT m.*, ROW_NUMBER() OVER (
          PARTITION BY (
              case when from_user_id = ${userId} then to_user_id
                   else from_user_id
                  end)
          ORDER BY id
          DESC) AS rn
      FROM wetalk.message AS m
      where from_user_id = ${userId} or to_user_id = ${userId} ORDER BY id ASC
    )
    SELECT *
    FROM ranked_messages where rn <= ${messageCount}
  `.then(raws => raws?.map((item: any) => ({
      ...item,
      fromUserId: item.from_user_id,
      toUserId: item.to_user_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    })) ?? [])
}

export function findNMessagesBeforeId (
  userAId: number, userBId: number, messageId: number, messageCount = defaultMessageCount
) {
  return prisma.message.findMany({
    where: {
      OR: [{ fromUserId: userAId, toUserId: userBId },
        { fromUserId: userBId, toUserId: userAId }]
    },
    cursor: { id: messageId },
    skip: 1,
    take: -messageCount
  })
}
