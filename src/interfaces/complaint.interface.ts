import { NivelComplaint, TypeComplaint, Location } from '@prisma/client'

export type Complaint = {
  id: string
  typeComplaint: TypeComplaint
  nivelComplaint: NivelComplaint
  imageComplait: string
  description: string
  location: Location
  UserId: string
  createdAt: Date
}

export type CreateComplaint = {
  typeComplaint: TypeComplaint
  nivelComplaint: NivelComplaint
  imageComplaint: string
  description: string
  location: Location
  UserId: string
}

export type UpdatedComplaint = {
  typeComplaint?: TypeComplaint
  nivelComplaint?: NivelComplaint
  imageComplaint?: string
  description?: string
  UserId: string
}

export interface ComplaintRepository {
  create(data: CreateComplaint): Promise<Complaint>
  findById(id: string): Promise<Complaint | null>
}
