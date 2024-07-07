import { prisma } from '../database/prisma-client'
import {
  Comment,
  CommentRepository,
  CreateComment,
  UpdatedComment,
} from '../interfaces/comment.interface'

class CommentRepositoryPrisma implements CommentRepository {
  async create(data: CreateComment): Promise<Comment> {
    const newComment = await prisma.comment.create({
      data: {
        description: data.description,
        imageComment: data.imageComment,
        postBlogId: data.postBlogId,
        userId: data.userId,
      },
    })
    return newComment
  }

  async findById(id: string): Promise<Comment | null> {
    const findIdComment = await prisma.comment.findUnique({
      where: { id },
    })
    return findIdComment
  }

  async findAll(): Promise<Comment[]> {
    return await prisma.comment.findMany({
      include: {
        user: true,
        postBlog: true,
      },
    })
  }

  async update(id: string, data: Partial<UpdatedComment>): Promise<Comment> {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        description: data.description,
        imageComment: data.imageComment,
        postBlogId: data.postBlogId,
        userId: data.userId,
      },
      include: {
        user: true,
        postBlog: true,
      },
    })
    return updatedComment
  }

  async delete(id: string): Promise<void> {
    const deleteComment = await prisma.comment.delete({
      where: { id },
    })
  }
}

export { CommentRepositoryPrisma }
