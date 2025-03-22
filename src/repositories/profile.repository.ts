import { Profile } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import { CreateProfile, UpdateProfile } from '../interfaces/profile.interface'

interface IProfileRepository {
  findByID: (id: string) => Promise<Profile | null>
  findAll: () => Promise<Profile[]>
  findByCpf: (cpf: string) => Promise<Profile | null>
  create: (data: CreateProfile) => Promise<Profile>
  update: (id: string, data: UpdateProfile) => Promise<Profile>
  delete: (id: string) => Promise<void>
}

export class ProfileRepositoryPrisma implements IProfileRepository {
  async findByID(id: string) {
    return await prisma.profile.findUnique({
      where: { id },
      include: { user: true },
    })
  }

  async findAll() {
    return await prisma.profile.findMany()
  }

  async findByCpf(cpf: string) {
    return await prisma.profile.findUnique({ where: { cpf } })
  }

  async create(data: CreateProfile) {
    return await prisma.profile.create({ data: data })
  }

  async update(id: string, data: UpdateProfile) {
    return await prisma.profile.update({ where: { id }, data: data })
  }

  async delete(id: string): Promise<void> {
    await prisma.profile.delete({ where: { id } })
  }
}
