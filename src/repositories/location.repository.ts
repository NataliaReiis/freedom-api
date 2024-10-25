import { Location } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import {
  CreateLocationDto,
  UpdateLocationDto,
} from '../interfaces/location.interface'

export interface ILocationRepository {
  find: () => Promise<Location[]>
  findById: (id: string) => Promise<Location | null>
  create: (data: CreateLocationDto) => Promise<Location>
  update: (id: string, data: UpdateLocationDto) => Promise<Location | null>
  delete: (id: string) => Promise<void>
}
export class LocationRepositoryPrisma implements ILocationRepository {
  async find() {
    return await prisma.location.findMany()
  }

  async findById(id: string) {
    return await prisma.location.findUnique({
      where: { id },
    })
  }

  async create(dto: CreateLocationDto) {
    return await prisma.location.create({
      data: dto,
    })
  }

  async update(id: string, dto: UpdateLocationDto) {
    return await prisma.location.update({
      where: { id },
      data: dto,
    })
  }

  async delete(id: string) {
    await prisma.location.delete({
      where: { id },
    })
  }
}
