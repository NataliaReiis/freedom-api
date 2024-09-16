import { FastifyInstance } from 'fastify'
import { LocationUseCase } from '../usecases/location.usecase'
import {
  PostBlogCreate,
  PostBlogUpdated,
} from '../interfaces/post-blog.interface'
import { CreateLocation } from '../interfaces/location.interface'

export async function locationRoute(fastify: FastifyInstance) {
  const locationUseCase = new LocationUseCase()

  fastify.post<{ Body: CreateLocation }>('/', async (req, reply) => {
    const { latitude, longitude } = req.body
    try {
      const data = await locationUseCase.create({
        latitude,
        longitude,
      })
      return reply.send(data)
    } catch (error) {
      console.log(error)
      return reply.status(500).send({ message: 'Internal server error' })
    }
  })

  fastify.get('/', async (req, reply) => {
    try {
      const location = await locationUseCase.getAll()
      return reply.send(location)
    } catch (error) {
      console.log(error)
      req.log.error(error)
      return reply.status(500).send({ message: 'Internal server error' })
    }
  })
}
