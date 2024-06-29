import { NivelComplaint, TypeComplaint, Location } from '@prisma/client'
import { User } from './user.interface'

export interface ComplaintBase {
  id: string
  createdAt: Date
  typeComplaint: TypeComplaint
  nivelComplaint: NivelComplaint
  imageComplaint: string
  description: string
  location: Location
  locationId: string
  user: User
  userId: string
}

export type Complaint = Omit<ComplaintBase, 'userId' | 'locationId'>

export type CreateComplaint = Pick<
  ComplaintBase,
  | 'typeComplaint'
  | 'nivelComplaint'
  | 'imageComplaint'
  | 'description'
  | 'locationId'
  | 'userId'
>

export type UpdatedComplaint = Partial<ComplaintBase>

export interface ComplaintRepository {
  create(data: CreateComplaint): Promise<Complaint>
  findById(id: string): Promise<Complaint | null>
  findAll(): Promise<Complaint[]>
  update(id: string, data: UpdatedComplaint): Promise<Complaint | null>
  delete(id: string): Promise<void>
}
