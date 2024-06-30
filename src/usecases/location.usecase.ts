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

  async create({
    id,
    createdAt,
    latitude,
    longitude,
  }: CreateLocation): Promise<Location> {
    const result = await this.locationRepository.create({
      id,
      createdAt,
      latitude,
      longitude,
    })
    return result
  }
}

export { LocationUseCase }
