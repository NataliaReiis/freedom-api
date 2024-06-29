export interface Location {
  id: string
  latitude: number
  longitude: number
}

export interface CreateLocation {
  latitude: number
  longitude: number
}

export interface UpdatedLocation {
  latitude?: number
  longitude?: number
}
