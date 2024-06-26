export type User = {
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

export type UserCreate = {
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
export type UpdatedUser = {
  email?: string
  name?: string
  password?: string
  tel?: string | null
  marital_status?: string
  cpf?: string
  age?: number
  sex?: string
}

export interface UserRepository {
  create(data: UserCreate): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  update(id: string, data: Partial<UpdatedUser>): Promise<User>
  delete(id: string): Promise<void>
}
