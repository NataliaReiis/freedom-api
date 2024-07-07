import { PostBlog } from "@prisma/client"
import { User } from "./user.interface"

export type CommentBase = {
  id: string
  description: string
  imageComment: string
  createdAt: Date
  updatedAt: Date
  user: User
  userId: string
  postBlog: PostBlog
  postBlogId: string
}

export type Comment = Omit<CommentBase, 'id'>

export type CreateComment = Pick<
  CommentBase,
  'description' | 'imageComment' | 'userId' | 'postBlogId' | 'userId'
>

export type UpdatedComment = Partial<CommentBase> & { updatedAt?: Date }

export interface CommentRepository {
  create(data: CreateComment): Promise<Comment>
  findById(id: string): Promise<Comment | null>
  findAll(): Promise<Comment[]>
  update(id: string, data: UpdatedComment): Promise<Comment | null>
  delete(id: string): Promise<void>
}
