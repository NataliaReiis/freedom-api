import { prisma } from '../database/prisma-client'
import { UpdatedComment } from '../interfaces/comment.interface'
import {
  Complaint,
  ComplaintRepository,
  CreateComplaint,
  UpdatedComplaint,
} from '../interfaces/complaint.interface'
import { NivelComplaint, TypeComplaint, Location } from '@prisma/client'

class ComplaintRepositoryPrisma implements ComplaintRepository {
  async create(data: CreateComplaint): Promise<Complaint> {
    const result = await prisma.complaint.create({
      data: {
        userId: data.userId,
        locationId: data.locationId,
        description: data.description,
        typeComplaint: data.typeComplaint as TypeComplaint,
        nivelComplaint: data.nivelComplaint as NivelComplaint,
        imageComplaint: data.imageComplaint,
      },
      include: {
        location: true,
        user: true,
      },
    })

    return result
  }

  async findById(id: string): Promise<Complaint | null> {
    const complaint = await prisma.complaint.findUnique({
      where: { id },
      include: {
        location: true,
        user: true,
      },
    })

    return complaint
  }

  async findAll(): Promise<Complaint[]> {
    return await prisma.complaint.findMany({
      include: {
        location: true,
        user: true,
      },
    })
  }

  async update(id: string, data: UpdatedComplaint): Promise<Complaint> {
    const updatedComplaint = await prisma.complaint.update({
      where: { id },
      data: {
        userId: data.userId,
        locationId: data.locationId,
        description: data.description,
        typeComplaint: data.typeComplaint as TypeComplaint,
        nivelComplaint: data.nivelComplaint as NivelComplaint,
        imageComplaint: data.imageComplaint,
      },
      include: {
        location: true,
        user: true,
      },
    })
    return updatedComplaint
  }

  async delete(id: string): Promise<void> {
    await prisma.complaint.delete({
      where: { id },
    })
  }
}

export { ComplaintRepositoryPrisma }
