import { PrismaClient } from '@prisma/client'
import 'server-only'

const globalForDB = globalThis as unknown as {
  cachedDB: PrismaClient | undefined
}

const db = globalForDB.cachedDB ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForDB.cachedDB = db

export { db }
