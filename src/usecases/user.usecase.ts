// Aqui vai toda a logica, regras de negocios e afins.
// Também poderia ser o arquivo de controllers

import {
  UpdatedUser,
  User,
  UserCreate,
  UserRepository,
} from '../interfaces/user.interface'
import { UserRepositoryPrisma } from '../repositories/user.repository'

class UserUseCase {
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepositoryPrisma()
  }

  async create({
    name,
    email,
    age,
    cpf,
    imageDoc,
    imageDocSelf,
    imageSelf,
    marital_status,
    password,
    sex,
    tel,
  }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email)
    if (verifyIfUserExists) {
      Error('User already exists')
    }

    const result = await this.userRepository.create({
      name,
      email,
      age,
      cpf,
      imageDoc,
      imageDocSelf,
      imageSelf,
      marital_status,
      password,
      sex,
      tel,
    })
    console.log(result)
    return result
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email)
  }

  async update(id: string, data: Partial<UpdatedUser>): Promise<User> {
    const userExists = await this.userRepository.findById(id)
    if (!userExists) {
      throw new Error('User not found')
    }
    const updatedUser = await this.userRepository.update(id, data)
    return updatedUser
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
