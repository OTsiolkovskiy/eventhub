import prisma from '../prisma/client';

export async function createRoleService(name: string) {
  return await prisma.role.create({
    data: {
      name
    }
  });
};

export async function deleteRoleService(id: string) {
  return await prisma.role.delete({
    where: {
      id
    }
  })
};

export async function updateRoleServise(id: string, name: string) {
  return await prisma.role.update({
    where: {
      id
    },
    data: {
      name
    }
  })
};

export async function findAllRolesService() {
  return await prisma.role.findMany();
};

export async function findOneRoleService(id: string) {
  return await prisma.role.findUnique({
    where: {
      id
    }
  })
}