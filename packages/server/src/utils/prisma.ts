import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

/**
 * https://www.prisma.io/docs/concepts/components/prisma-client/error-reference
 */
export enum PrismaErrorCode {
  UniqueConstants = 'P2002',
  RecordNotFound = 'P2016'
}
