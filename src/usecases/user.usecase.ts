// Aqui vai toda a logica, regras de negocios e afins.
// Também poderia ser o arquivo de controllers

import { User } from '@prisma/client'
import { CreateUserDto, updateUserDto } from '../interfaces/user.interface'
import UserRepositoryPrisma from '../repositories/user.repository'

class UserUseCase {
  readonly userRepository: UserRepositoryPrisma

  constructor() {
    this.userRepository = new UserRepositoryPrisma()
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id)
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email)
  }

  async create(data: CreateUserDto): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(data.email)

    if (verifyIfUserExists) {
      Error('User already exists')
    }

    return await this.userRepository.create(data)
  }

  async update(id: string, data: Partial<updateUserDto>) {
    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      throw new Error('User not found')
    }
    return await this.userRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const userExists = await this.userRepository.findById(id)
    if (!userExists) {
      throw new Error('User not found')
    }
    await this.userRepository.delete(id)
  }
}

export { UserUseCase }
