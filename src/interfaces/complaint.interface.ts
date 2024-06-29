import { Location } from './location.interface'

export interface Complaint {
  id: string
  typeComplainer: string
  nivelComplainer: string
  imageComplainer: string
  description: string
  location: Location[]
}

export interface CreatComplainer {
  name: string
  email: string
  phone: string
}

export interface UpdatedComplainer {
  name?: string
  email?: string
  phone?: string
}
