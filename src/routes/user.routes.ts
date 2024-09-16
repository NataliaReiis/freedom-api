import fastify, { FastifyInstance } from 'fastify'
import { UserUseCase } from '../usecases/user.usecase'
import { UpdatedUser, UserCreate } from '../interfaces/user.interface'
import bcrypt from 'bcryptjs'

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  async function generateHash(password: string) {
    return bcrypt.hash(password, 10)
  }

  fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
    const { name, email, password, tel, ...rest } = req.body
    try {
      const data = await userUseCase.create({
        name,
        email,
        password: await generateHash(password),
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

  fastify.put<{ Params: { id: string }; Body: Partial<UpdatedUser> }>(
    '/:id',
    async (req, reply) => {
      try {
        const { id } = req.params
        const data = req.body
        const updatedUser = await userUseCase.update(id, data)
        return reply.send(updatedUser)
      } catch (error) {
        reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  fastify.delete('/:id', async (req, reply) => {
    try {
      const { id } = req.params as { id: string }
      await userUseCase.delete(id)
      reply.status(200).send({ message: 'User deleted' })
    } catch (error) {
      reply.status(500).send({ message: 'Internal server error' })
    }
  })
}
