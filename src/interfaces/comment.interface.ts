export interface Comment {
  id: string
  description: string
  imageComment: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateComment {
  description: string
  imageComment: string
}

export interface UpdatedComment {
  description?: string
  imageComment?: string
}
