import { Comment } from './comment.interface'

export type PostBlog = {
  id: string
  description: string
  imagePost: string
  userId: string
  comment?: Comment[]
}

export type PostBlogCreate = {
  description: string
  imagePost: string
  userId: string
}

export type PostBlogUpdated = {
  userId: string
  description?: string
  imagePost?: string
}

export interface PostBlogRepository {
  create(data: PostBlogCreate): Promise<PostBlog>
  findAll(): Promise<PostBlog[]>
  findById(id: string): Promise<PostBlog | null>
  update(id: string, data: Partial<PostBlogUpdated>): Promise<PostBlog>
  delete(id: string): Promise<PostBlog>
}
