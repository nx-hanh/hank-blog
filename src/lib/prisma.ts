import { PrismaClient } from '@prisma/client';
// Prisma is now configured for MongoDB

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
