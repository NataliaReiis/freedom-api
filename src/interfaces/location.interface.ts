export type LocationBase = {
  id: string
  latitude: number
  longitude: number
  createdAt: Date
}

export type Location = Omit<LocationBase, 'id' | 'createdAt'>

export type CreateLocation = Pick<LocationBase, 'latitude' | 'longitude'>

export interface LocationRepository {
  create(data: CreateLocation): Promise<Location>
  findAll(): Promise<Location[]>
  findById(id: string): Promise<Location | null>
}
