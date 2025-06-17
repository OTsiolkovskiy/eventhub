import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const roles = ['admin', 'user'];

  for (const role of roles) {
    const existsRole = await prisma.role.findUnique({
      where: {
        name: role
      }
    })

    if (!existsRole) {
      await prisma.role.create({
        data: {
          name: role
        }
      }) 
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
  