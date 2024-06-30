import {
  Complaint,
  ComplaintRepository,
  CreateComplaint,
  UpdatedComplaint,
} from '../interfaces/complaint.interface'
import { ComplaintRepositoryPrisma } from '../repositories/complaint.repository'

class UseCaseComplaint {
  private complaintRepository: ComplaintRepository
  constructor() {
    this.complaintRepository = new ComplaintRepositoryPrisma()
  }

  async create(data: CreateComplaint): Promise<Complaint> {
    const result = await this.complaintRepository.create(data)

    return result
  }

  async getAll(): Promise<Complaint[]> {
    return await this.complaintRepository.findAll()
  }

  async getId(id: string): Promise<Complaint | null> {
    return await this.complaintRepository.findById(id)
  }

  async update(id: string, data: UpdatedComplaint): Promise<Complaint | null> {
    const complaintExists = await this.complaintRepository.findById(id)
    if (!complaintExists) {
      throw new Error('Complaint not found')
    }
    const updatedComplaint = await this.complaintRepository.update(id, data)
    return updatedComplaint
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
