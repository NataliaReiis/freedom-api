import { prisma } from '../database/prisma-client'
import {
  Complaint,
  ComplaintRepository,
  CreateComplaint,
} from '../interfaces/complaint.interface'
import { NivelComplaint, TypeComplaint, Location } from '@prisma/client'

class ComplaintRepositoryPrisma implements ComplaintRepository {
  async create(data: CreateComplaint): Promise<Complaint> {
    const result = await prisma.complaint.create({
      data: {
        userId: data.UserId,
        description: data.description,
        typeComplaint: data.typeComplaint as TypeComplaint,
        nivelComplaint: data.nivelComplaint as NivelComplaint,
        imageComplaint: data.imageComplaint,
        location: {
          create: data.location,
        },
      },
    })

    return result
  }

  async findById(id: string): Promise<Complaint | null> {
    const complaint = await prisma.complaint.findUnique({
      where: { id },
    })

    return complaint
  }
}

export { ComplaintRepositoryPrisma }
