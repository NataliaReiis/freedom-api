import fastify, { FastifyInstance } from 'fastify'
import { UserUseCase } from '../usecases/user.usecase'
import generateHash from '../usecases/auth.usecase'
import { CreateUserDto, updateUserDto } from '../interfaces/user.interface'

export async function userRoute(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  fastify.post<{ Body: CreateUserDto }>('/', async (req, reply) => {
    try {
      const { name, email, password, tel, ...rest } = req.body

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

  fastify.get<{ Querystring: { id: string; email: string } }>(
    '/',
    async (req, reply) => {
      try {
        const { id, email } = req.query

        if (id) {
          return await userUseCase.getById(id)
        } else if (email) {
          return await userUseCase.getByEmail(email)
        } else {
          const users = await userUseCase.getAll()
          return reply.send(users)
        }
      } catch (error) {
        req.log.error(error)
        reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  fastify.put<{ Querystring: { id: string }; Body: updateUserDto }>(
    '/:id',
    async (req, reply) => {
      try {
        const { id } = req.query
        const data = req.body

        const updatedUser = await userUseCase.update(id, data)

        if (!updatedUser) {
          return reply.status(404).send({ message: 'User not found' }) // Retorna 404 se o usuário não for encontrado
        }

        return reply.send(updatedUser)
      } catch (error) {
        reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  fastify.delete<{ Querystring: { id: string } }>(
    '/:id',
    async (req, reply) => {
      try {
        const { id } = req.query
        await userUseCase.delete(id)

        reply.status(200).send({ message: 'Usuario deletado' })
      } catch (error) {
        reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )
}
