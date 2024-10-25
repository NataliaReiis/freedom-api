import { Comment } from '@prisma/client'
import {
  CreateCommentDto,
  UpdatedCommentDto,
} from '../interfaces/comment.interface'
import CommentRepositoryPrisma from '../repositories/comment.repository'

class CommentUseCase {
  private commentRepository: CommentRepositoryPrisma
  constructor() {
    this.commentRepository = new CommentRepositoryPrisma()
  }

  async create(data: CreateCommentDto): Promise<Comment> {
    const result = await this.commentRepository.create(data)

    return result
  }

  async getAll(): Promise<Comment[]> {
    return await this.commentRepository.findAll()
  }

  async getId(id: string): Promise<Comment | null> {
    return await this.commentRepository.findById(id)
  }

  async update(id: string, data: UpdatedCommentDto): Promise<Comment | null> {
    const commmentExists = await this.commentRepository.findById(id)
    if (!commmentExists) {
      throw new Error('Comment not found')
    }
    const UpdatedCommentDto = await this.commentRepository.update(id, data)
    return UpdatedCommentDto
  }
  async delete(id: string): Promise<void> {
    const commentExists = await this.commentRepository.findById(id)
    if (!commentExists) {
      throw new Error('Comment not found')
    }
    await this.commentRepository.delete(id)
  }
}

export { CommentUseCase }
