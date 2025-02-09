import { Location } from '@prisma/client'
import { CreateLocationDto } from '../interfaces/location.interface'
import { LocationRepositoryPrisma } from '../repositories/location.repository'

class LocationUseCase {
  private readonly locationRepository: LocationRepositoryPrisma
  constructor() {
    this.locationRepository = new LocationRepositoryPrisma()
  }

  async create(data: CreateLocationDto): Promise<Location> {
    return await this.locationRepository.create(data)
  }

  async getAll(): Promise<Location[]> {
    return await this.locationRepository.find()
  }

  async getId(id: string): Promise<Location | null> {
    return await this.locationRepository.findById(id)
  }
}

export { LocationUseCase }
