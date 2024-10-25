export type CreatePostBlogDto = {
  description: string
  imagePost: string
  userId: string
}
export type UpdatePostBlogDto = Partial<CreatePostBlogDto>

export type GetUserSearchParams = {
  id: string
}
