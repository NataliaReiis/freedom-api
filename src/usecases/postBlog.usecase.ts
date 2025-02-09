import { PostBlog } from '@prisma/client'
import { CreatePostBlogDto } from '../interfaces/post-blog.interface'
import { PostBlogRepositoryPrisma } from '../repositories/post-blog.respository'

class PostBlogUseCase {
  private readonly postBlogRepository: PostBlogRepositoryPrisma

  constructor() {
    this.postBlogRepository = new PostBlogRepositoryPrisma()
  }

  async create({
    description,
    imagePost,
    userId,
  }: CreatePostBlogDto): Promise<PostBlog> {
    const result = await this.postBlogRepository.create({
      description,
      imagePost,
      userId,
    })
    return result
  }

  async getAll(): Promise<PostBlog[]> {
    return await this.postBlogRepository.findAll()
  }

  async getId(id: string): Promise<PostBlog | null> {
    return await this.postBlogRepository.findById(id)
  }

  async update(id: string, data: Partial<PostBlog>): Promise<PostBlog> {
    const postExists = await this.postBlogRepository.findById(id)
    if (!postExists) {
      throw new Error('Post not found')
    }
    const updatedPostBlog = await this.postBlogRepository.update(id, data)
    return updatedPostBlog
  }

  async delete(id: string): Promise<void> {
    const postExists = await this.postBlogRepository.findById(id)
    if (!postExists) {
      throw new Error('Post not found')
    }
    await this.postBlogRepository.delete(id)
  }
}

export { PostBlogUseCase }
