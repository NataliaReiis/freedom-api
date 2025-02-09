import { Comment } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import {
  CreateCommentDto,
  UpdatedCommentDto,
} from '../interfaces/comment.interface'

interface ICommentRepository {
  findAll: () => Promise<Comment[]>
  findById: (id: string) => Promise<Comment | null>
  findByUserId: (userId: string) => Promise<Comment[]>
  findByPostBlogId: (postBlogId: string) => Promise<Comment[]>
  create: (dto: CreateCommentDto) => Promise<Comment>
  update: (id: string, dto: UpdatedCommentDto) => Promise<Comment>
  delete: (id: string) => Promise<void>
}
export default class CommentRepositoryPrisma implements ICommentRepository {
  async findAll(): Promise<Comment[]> {
    return await prisma.comment.findMany({
      include: {
        user: true,
        postBlog: true,
      },
    })
  }

  async findById(id: string) {
    return await prisma.comment.findUnique({
      where: { id },
    })
  }

  async findByUserId(userId: string) {
    return await prisma.comment.findMany({ where: { userId } })
  }

  async findByPostBlogId(postBlogId: string) {
    return await prisma.comment.findMany({ where: { postBlogId } })
  }
  async create(dto: CreateCommentDto) {
    return await prisma.comment.create({ data: dto })
  }

  async update(id: string, dto: UpdatedCommentDto) {
    return await prisma.comment.update({
      where: { id },
      data: dto,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.comment.delete({
      where: { id },
    })
  }
}
