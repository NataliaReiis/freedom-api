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
}

export { UserRepositoryPrisma }
