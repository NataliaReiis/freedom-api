//Operações com banco de dados vem aqui

import { prisma } from '../database/prisma-client'
import { User, UserRepository, UserCreate } from '../interfaces/user.interface'

class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: {
        ...data,
      },
    })
    return result
  }
  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    return result || null
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user || null
  }

  async update(id: string, data: Partial<UserCreate>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    })
    return updatedUser
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }
}

export { UserRepositoryPrisma }
