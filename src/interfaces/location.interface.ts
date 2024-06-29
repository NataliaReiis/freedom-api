export type Location = {
  id: string
  latitude: number
  longitude: number
}

export type CreateLocation = {
  latitude: number
  longitude: number
}

export type UpdatedLocation = {
  latitude?: number
  longitude?: number
}

export interface LocationRepository {
  create(data: CreateLocation): Promise<Location>
}
