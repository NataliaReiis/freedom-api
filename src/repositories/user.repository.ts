//Operations in database here

import { User } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import { CreateUserDto, updateUserDto } from '../interfaces/user.interface'

export interface IUserRepository {
  findAll: () => Promise<User[]>
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  create: (dto: CreateUserDto) => Promise<User>
  update: (id: string, updateUserDto: updateUserDto) => Promise<User>
  delete: (id: string) => Promise<void>
}

export default class UserRepositoryPrisma implements IUserRepository {
  async findAll() {
    return await prisma.user.findMany()
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  async create(dto: CreateUserDto) {
    return await prisma.user.create({ data: dto })
  }

  async update(id: string, dto: updateUserDto) {
    return await prisma.user.update({
      where: { id },
      data: dto,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
