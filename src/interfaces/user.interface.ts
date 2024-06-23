export interface User {
  id: string
  email: string
  name: string
  password: string
  tel: string | null
  marital_status: string
  cpf: string
  age: number
  sex: string
  imageDoc: string
  imageSelf: string
  imageDocSelf: string
  createdAt: Date
  updatedAt: Date
}

export interface UserCreate {
  email: string
  name: string
  password: string
  tel: string | null
  marital_status: string
  cpf: string
  age: number
  sex: string
  imageDoc: string
  imageSelf: string
  imageDocSelf: string
}

export interface UserRepository {
  create(data: UserCreate): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
}
