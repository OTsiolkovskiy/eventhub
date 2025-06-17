import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function generateToken(userId: string, roleId: string) {
  return jwt.sign({ userId, roleId }, JWT_SECRET, { expiresIn: '7d' });
}

export async function register(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) throw new Error ('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const userRole = await prisma.role.findUnique({
    where: {
      name: 'user'
    }
  });

  if (!userRole) throw new Error ('Default role not found');

  const user = await prisma.user.create({
    data: {
      userName: name,
      email,
      passwordHash: hashedPassword,
      role: {
        connect: { id: userRole.id }
      }
    }
  })

  return generateToken(user.id, user.roleId);
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) throw new Error('Invalid credentials');

  return generateToken(user.id, user.roleId);
}
