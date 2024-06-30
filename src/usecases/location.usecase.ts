import {
  CreateLocation,
  Location,
  LocationRepository,
} from '../interfaces/location.interface'
import { LocationRepositoryPrisma } from '../repositories/location.repository'

class LocationUseCase {
  private locationRepository: LocationRepository
  constructor() {
    this.locationRepository = new LocationRepositoryPrisma()
  }

  async create({ latitude, longitude }: CreateLocation): Promise<Location> {
    const result = await this.locationRepository.create({
      latitude,
      longitude,
    })
    return result
  }

  async getAll(): Promise<Location[]> {
    return await this.locationRepository.findAll()
  }

  async getId(id: string): Promise<Location | null> {
    return await this.locationRepository.findById(id)
  }
}

export { LocationUseCase }
