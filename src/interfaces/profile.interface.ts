export type Profile = {
  id: string
  name: string
  tel: string
  age: number
  sex?: string
  cpf: string
  marital_status?: string
  userID: string
}

export type CreateProfile = Omit<Profile, 'id'>

export type UpdateProfile = Partial<CreateProfile>

export type CreateProfileWithUser = {
  email: string
  password: string
  name: string
  tel: string
  age: number
  sex?: string
  cpf: string
  marital_status?: string
}
