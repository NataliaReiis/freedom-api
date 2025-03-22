import { CreateProfile, UpdateProfile } from '../interfaces/profile.interface'
import { ProfileRepositoryPrisma } from '../repositories/profile.repository'

class ProfileUseCase {
  readonly profileRepository: ProfileRepositoryPrisma

  constructor() {
    this.profileRepository = new ProfileRepositoryPrisma()
  }

  async getbyId(id: string) {
    return this.profileRepository.findByID(id)
  }
  async getAll() {
    return this.profileRepository.findAll()
  }

  async getByCpf(cpf: string) {
    return this.profileRepository.findByCpf(cpf)
  }

  async create(data: CreateProfile) {
    return this.profileRepository.create(data)
  }

  async update(id: string, data: UpdateProfile) {
    return this.profileRepository.update(id, data)
  }
  async remove(id: string): Promise<void> {
    this.profileRepository.delete(id)
  }
}

export { ProfileUseCase }
