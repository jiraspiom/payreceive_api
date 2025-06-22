import { PrismaClient } from '../../src/generated/prisma/client.js'

const prisma = new PrismaClient()
export default prisma

// import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'
// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient
// }
// const prisma =
//   globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
// export { prisma }

// import { PrismaClient } from '@prisma/client'
// declare global {
//   // eslint-disable-next-line no-var
//   var cachedPrisma: PrismaClient
// }
// let prisma: PrismaClient
// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient()
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = new PrismaClient()
//   }
//   prisma = global.cachedPrisma
// }
// export { prisma }

// import { PrismaClient } from '@prisma/client/edge'
// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
//   })
// }
// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined
// }

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// export { prisma }

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
