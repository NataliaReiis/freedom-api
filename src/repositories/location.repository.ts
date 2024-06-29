import { prisma } from '../database/prisma-client'
import {
  Location,
  CreateLocation,
  LocationRepository,
} from '../interfaces/location.interface'

class LocationRepositoryPrisma implements LocationRepository {
  async create(data: CreateLocation): Promise<Location> {
    const result = await prisma.location.create({
      data: {
        ...data,
      },
    })
    return result
  }
}

export { LocationRepositoryPrisma }
