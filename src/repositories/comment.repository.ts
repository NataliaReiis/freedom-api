import { prisma } from '../database/prisma-client'
import { Comment, CommentRepository, CreateComment } from '../interfaces/comment.interface';


class CommentRepositoryPrisma implements CommentRepository {
    async create(data: CreateComment): Promise<Comment> {
        const result = await prisma.comment.create({
            data: {
                description: data.description,
                

                
          }
      })
  }
}