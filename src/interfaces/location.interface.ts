export type CreateLocationDto = {
  latitude: number
  longitude: number
  complaintId: string
}

export type UpdateLocationDto = Partial<CreateLocationDto>

export type GetLocationSearchParams = {
  id: string
}
