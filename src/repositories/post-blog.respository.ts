import { PostBlog } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import {
  CreatePostBlogDto,
  UpdatePostBlogDto,
} from '../interfaces/post-blog.interface'

export interface IPostBlogRepository {
  findAll(): Promise<PostBlog[]>
  findById: (id: string) => Promise<PostBlog | null>
  create: (dto: CreatePostBlogDto) => Promise<PostBlog>
  update(id: string, dto: UpdatePostBlogDto): Promise<PostBlog>
  delete(id: string): Promise<PostBlog>
}

export class PostBlogRepositoryPrisma implements IPostBlogRepository {
  async findAll(): Promise<PostBlog[]> {
    return await prisma.postBlog.findMany({
      include: {
        user: true,
        comment: true,
      },
    })
  }

  async findById(id: string) {
    return await prisma.postBlog.findUnique({
      where: { id },
    })
  }
  async create(dto: CreatePostBlogDto) {
    return await prisma.postBlog.create({ data: dto })
  }

  async update(id: string, dto: UpdatePostBlogDto) {
    return await prisma.postBlog.update({
      where: { id },
      data: dto,
    })
  }

  async delete(id: string) {
    return await prisma.postBlog.delete({
      where: { id },
    })
  }
}
