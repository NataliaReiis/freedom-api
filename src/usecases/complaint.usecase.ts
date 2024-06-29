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
}
