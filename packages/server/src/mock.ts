import { MessageType, Relationship, RelationshipStatus, User } from '@prisma/client'
import { RegisterDTO } from '@we-talk/common'
import faker from 'faker'
import { encryptPassword } from './utils/password'
import { prisma } from './utils/prisma'

const fakeUserCount = 20
const fakeMessageCount = 30
const defaultPassword = '123456'

const oneFakeUser = (password: string, key: number): RegisterDTO => ({
  username: faker.phone.phoneNumber('1#########'),
  password,
  nickname: faker.name.firstName() + ' ' + faker.name.lastName(),
  avatar: `https://javaee-bay.oss-cn-beijing.aliyuncs.com/we-talk/mock/${key % 20}.jpg?x-oss-process=style/avatar`,
  intro: faker.lorem.sentence()
})

function generateUsers (password: string, n = fakeUserCount): RegisterDTO[] {
  return new Array(n).fill(0).map((item, index) => oneFakeUser(password, index))
}

async function insertUsers (users: RegisterDTO[]) {
  const usersWithId = await Promise.all(users.map(data => prisma.user.create({ data })))
  return usersWithId
}

function insertRelationships (users: User[]) {
  const requests = []
  for (let i = 0; i < users.length; i++) {
    for (let j = i; j < users.length; j++) {
      requests.push(prisma.relationship.create({
        data: { fromUserId: users[i].id, toUserId: users[j].id, status: RelationshipStatus.Friend }
      }))
    }
  }
  return Promise.all(requests)
}

function insertMessages (relationships: Relationship[], messageCount = fakeMessageCount) {
  const requests = []
  for (let i = 0; i < relationships.length; i++) {
    for (let j = 0; j < fakeMessageCount; j++) {
      const element = Math.floor(Math.random() * 2) === 0
        ? { fromUserId: relationships[i].fromUserId, toUserId: relationships[i].toUserId }
        : { toUserId: relationships[i].fromUserId, fromUserId: relationships[i].toUserId }
      requests.push(prisma.message.create({
        data: {
          type: MessageType.PlanText,
          content: faker.lorem.sentence(),
          ...element
        }
      }))
    }
  }
  return Promise.all(requests)
}

async function main () {
  const password = await encryptPassword(defaultPassword)
  const users = await insertUsers(generateUsers(password))
  const relationships = await insertRelationships(users)
  const messages = await insertMessages(relationships)
}

main()
