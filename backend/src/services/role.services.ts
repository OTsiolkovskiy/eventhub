import prisma from '../prisma/client';

export async function createRole(name: string) {
  return await prisma.role.create({
    data: {
      name
    }
  });
};

export async function deleteRole(id: string) {
  return await prisma.role.delete({
    where: {
      id
    }
  })
};

export async function updateRole(id: string, name: string) {
  return await prisma.role.update({
    where: {
      id
    },
    data: {
      name
    }
  })
};

export async function findAllRoles() {
  return await prisma.role.findMany();
};

export async function findOneRole(id: string) {
  return await prisma.role.findUnique({
    where: {
      id
    }
  })
}