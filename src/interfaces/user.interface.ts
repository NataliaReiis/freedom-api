export type CreateUserDto = {
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

export type updateUserDto = Partial<CreateUserDto>

export type GetUserSearchParams = {
  email: string
  id: string
}
