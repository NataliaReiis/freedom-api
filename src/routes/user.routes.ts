import fastify, { FastifyInstance } from 'fastify'
import { UserUseCase } from '../usecases/user.usecase'
import { UserCreate } from '../interfaces/user.interface'

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
    const { name, email, password, tel, ...rest } = req.body
    try {
      const data = await userUseCase.create({
        name,
        email,
        password,
        tel,
        ...rest,
      })
      return reply.send(data)
    } catch (error) {
      reply.send(error)
    }
  })

  fastify.get('/', async (req, reply) => {
    try {
      const users = await userUseCase.getAll()
      return reply.send(users)
    } catch (error) {
      req.log.error(error)
      reply.status(500).send({ message: 'Internal server error' })
    }
  })
}
