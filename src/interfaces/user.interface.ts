export type User = {
  id: string
  email: string
  password: string
}

export type CreateUserDto = Omit<User, 'id'>

export type updateUserDto = Partial<CreateUserDto>

export type GetUserSearchParams = {
  email: string
  id: string
}
