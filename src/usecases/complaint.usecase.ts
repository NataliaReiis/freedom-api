import { Complaint } from '@prisma/client'
import { ComplaintRepositoryPrisma } from '../repositories/complaint.repository'
import {
  CreateComplaintDto,
  UpdateComplaintDto,
} from '../interfaces/complaint.interface'

class UseCaseComplaint {
  private readonly complaintRepository: ComplaintRepositoryPrisma
  constructor() {
    this.complaintRepository = new ComplaintRepositoryPrisma()
  }

  async create(data: CreateComplaintDto): Promise<Complaint> {
    return await this.complaintRepository.create(data)
  }

  async getAll(): Promise<Complaint[]> {
    return await this.complaintRepository.findAll()
  }

  async getId(id: string): Promise<Complaint | null> {
    return await this.complaintRepository.findById(id)
  }

  async update(
    id: string,
    data: UpdateComplaintDto
  ): Promise<Complaint | null> {
    const complaintExists = await this.complaintRepository.findById(id)
    if (!complaintExists) {
      throw new Error('Complaint not found')
    }
    const UpdateComplaintDto = await this.complaintRepository.update(id, data)
    return UpdateComplaintDto
  }

  async delete(id: string): Promise<void> {
    const complaintExists = await this.complaintRepository.findById(id)
    if (!complaintExists) {
      throw new Error('Complaint not found')
    }
    await this.complaintRepository.delete(id)
  }
}

export { UseCaseComplaint }
