import { prisma } from '../database/prisma-client'
import {
  CreateComplaintDto,
  UpdateComplaintDto,
} from '../interfaces/complaint.interface'
import { Complaint } from '@prisma/client'

export interface IComplaintRepository {
  findAll: () => Promise<Complaint[]>
  findById: (id: string) => Promise<Complaint | null>
  create: (dto: CreateComplaintDto) => Promise<Complaint>
  update: (id: string, dto: UpdateComplaintDto) => Promise<Complaint>
  delete: (id: string) => Promise<void>
}

export class ComplaintRepositoryPrisma implements IComplaintRepository {
  async create(dto: CreateComplaintDto) {
    return await prisma.complaint.create({ data: dto })
  }
  async findAll(): Promise<Complaint[]> {
    return await prisma.complaint.findMany({
      include: {
        location: true,
        user: true,
      },
    })
  }
  async findById(id: string): Promise<Complaint | null> {
    return await prisma.complaint.findUnique({
      where: { id },
      include: {
        location: true,
      },
    })
  }

  async findbyUserId(userId: string) {
    return await prisma.complaint.findMany({
      where: { userId },
      include: {
        location: true,
      },
    })
  }

  async update(id: string, dto: UpdateComplaintDto) {
    return await prisma.complaint.update({
      where: { id },
      data: dto,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.complaint.delete({
      where: { id },
    })
  }
}
