import { error } from 'console'
import {
  Comment,
  CommentRepository,
  CreateComment,
  UpdatedComment,
} from '../interfaces/comment.interface'
import { CommentRepositoryPrisma } from '../repositories/comment.repository'

class CommentUseCase {
  private commentRepository: CommentRepository
  constructor() {
    this.commentRepository = new CommentRepositoryPrisma()
  }

  async create(data: CreateComment): Promise<Comment> {
    const result = await this.commentRepository.create(data)

    return result
  }

  async getAll(): Promise<Comment[]> {
    return await this.commentRepository.findAll()
  }

  async getId(id: string): Promise<Comment | null> {
    return await this.commentRepository.findById(id)
  }

  async update(id: string, data: UpdatedComment): Promise<Comment | null> {
    const commmentExists = await this.commentRepository.findById(id)
    if (!commmentExists) {
      throw new Error('Comment not found')
    }
    const updatedComment = await this.commentRepository.update(id, data)
    return updatedComment
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
