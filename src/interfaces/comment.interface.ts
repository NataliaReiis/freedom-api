export type CommentBase = {
  id: string
  description: string
  imageComment: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type Comment = Omit<CommentBase, 'userId'>

export type CreateComment = Pick<
  CommentBase,
  'description' | 'imageComment' | 'userId'
>

export type UpdatedComment = Partial<CommentBase>

export interface CommentRepository {
  create(data: CreateComment): Promise<Comment>
  findById(id: string): Promise<Comment | null>
  findAll(): Promise<Comment[]>
  update(id: string, data: UpdatedComment): Promise<Comment | null>
  delete(id: string): Promise<void>
}
