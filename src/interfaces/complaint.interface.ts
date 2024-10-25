import { NivelComplaint, TypeComplaint } from '@prisma/client'

export interface CreateComplaintDto {
  typeComplaint: TypeComplaint
  nivelComplaint: NivelComplaint
  imageComplaint?: string
  description: string
  locationId: string
  userId: string
}

export type UpdateComplaintDto = Partial<CreateComplaintDto>

export type GetComplaintSearchParams = {
  id: string
  userId: string
}
