export type CreateCommentDto = {
  description: string
  imageComment?: string
  userId: string
  postBlogId: string
}

export type UpdatedCommentDto = Partial<CreateCommentDto>
