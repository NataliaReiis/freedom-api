import { Profile } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import { CreateProfile, UpdateProfile } from '../interfaces/profile.interface'

interface IProfileRepository {
  findByID: (id: string) => Promise<Profile | null>
  findAll: () => Promise<Profile[]>
  create: (data: CreateProfile) => Promise<Profile>
  update: (id: string, data: UpdateProfile) => Promise<Profile>
  delete: (id: string) => void
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

  async create(data: CreateProfile) {
    return await prisma.profile.create({ data: data })
  }

  async update(id: string, data: UpdateProfile) {
    return await prisma.profile.update({ where: { id }, data: data })
  }

  async delete(id: string) {
    return await prisma.profile.delete({ where: { id } })
  }
}
