export type CreateLocationDto = {
  latitude: number
  longitude: number
}

export type UpdateLocationDto = Partial<CreateLocationDto>

export type GetLocationSearchParams = {
  id: string
}
