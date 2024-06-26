import { Location } from './location.interface'

export interface Complaint {
  id: string
  typeComplainer: string
  nivelComplainer: string
  imageComplainer: string
  description: string
  location: Location[]
}
