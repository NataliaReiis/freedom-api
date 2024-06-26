import { FastifyInstance } from 'fastify'
import { PostBlogUseCase } from '../usecases/postBlog.usecase'
import {
  PostBlogCreate,
  PostBlogUpdated,
} from '../interfaces/post-blog.interface'

export async function postBlogRoutes(fastify: FastifyInstance) {
  const postBlogUseCase = new PostBlogUseCase()

  fastify.post<{ Body: PostBlogCreate }>('/', async (req, reply) => {
    const { description, imagePost, userId } = req.body
    try {
      const data = await postBlogUseCase.create({
        description,
        imagePost,
        userId,
      })
      return reply.send(data)
    } catch (error) {
      console.log(error)
      return reply.status(500).send({ message: 'Internal server error' })
    }
  })

  fastify.get('/', async (req, reply) => {
    try {
      const postBlog = await postBlogUseCase.getAll()
      return reply.send(postBlog)
    } catch (error) {
      console.log(error)
      req.log.error(error)
      return reply.status(500).send({ message: 'Internal server error' })
    }
  })

  fastify.put<{ Params: { id: string }; Body: Partial<PostBlogUpdated> }>(
    ':id',
    async (req, reply) => {
      try {
        const { id } = req.params
        const data = req.body
        const updatedPostBlog = await postBlogUseCase.update(id, data)
        return reply.send(updatedPostBlog)
      } catch (error) {
        console.log(error)
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  fastify.delete('/:id', async (req, reply) => {
    try {
      const { id } = req.params as { id: string }
      await postBlogUseCase.delete(id)
      reply.status(200).send({ message: 'Post deleted' })
    } catch (error) {
      reply.status(500).send({ message: 'Internal server error' })
    }
  })
}
