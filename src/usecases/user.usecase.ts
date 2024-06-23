import { User, UserCreate, UserRepository } from '../interfaces/user.interface'
import { UserRepositoryPrisma } from '../repositories/user.repository'
//Aqui vai toda a logica, regras de negocios e afins.

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
}

export { UserUseCase }
