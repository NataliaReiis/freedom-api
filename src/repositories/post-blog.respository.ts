import { prisma } from '../database/prisma-client'
import {
  PostBlog,
  PostBlogCreate,
  PostBlogRepository,
  PostBlogUpdated,
} from '../interfaces/post-blog.interface'

class PostBlogRepositoryPrisma implements PostBlogRepository {
  async create(data: PostBlogCreate): Promise<PostBlog> {
    const newPostBlog = await prisma.postBlog.create({
      data: {
        description: data.description,
        imagePost: data.imagePost,
        userId: data.userId,
      },
    })
    return newPostBlog
  }

  async findAll(): Promise<PostBlog[]> {
    return await prisma.postBlog.findMany({
      include: {
        user: true,
        comment: true,
      },
    })
  }

  async findById(id: string): Promise<PostBlog | null> {
    const postBlog = await prisma.postBlog.findUnique({
      where: { id },
    })
    return postBlog
  }

  async update(id: string, data: Partial<PostBlogUpdated>): Promise<PostBlog> {
    const updatedPostBlog = await prisma.postBlog.update({
      where: { id },
      data,
    })
    return updatedPostBlog
  }

  async delete(id: string): Promise<PostBlog> {
    const deletedPostBlog = await prisma.postBlog.delete({
      where: { id },
    })
    return deletedPostBlog
  }
}

export { PostBlogRepositoryPrisma }
