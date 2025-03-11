import { FastifyInstance } from 'fastify'
import { ProfileUseCase } from '../usecases/profile.usecase'
import { CreateProfile, UpdateProfile } from '../interfaces/profile.interface'

export async function profileRouter(fastify: FastifyInstance) {
  const profileUseCase = new ProfileUseCase()

  fastify.post<{ Body: CreateProfile }>('/', async (req, reply) => {
    try {
      const { name, age, tel, userID, cpf, marital_status, sex } = req.body

      const data = await profileUseCase.create({
        name,
        age,
        tel,
        userID,
        cpf,
        marital_status,
        sex,
      })

      return reply.send(data)
    } catch (error) {
      reply.send('Erro interno no servidor')
    }
  })

  fastify.get<{ Querystring: { id: string } }>('/', async (req, reply) => {
    try {
      const { id } = req.query

      if (id) {
        const profile = await profileUseCase.getbyId(id)
        return reply.send(profile)
      }

      const profiles = await profileUseCase.getAll()
      return reply.send(profiles)
    } catch (error) {
      reply.send(error)
    }
  })

  fastify.put<{ Querystring: { id: string }; Body: UpdateProfile }>(
    '/:id',
    async (req, reply) => {
      try {
        const { id } = req.query
        const data = req.body

        const verifyProfile = await profileUseCase.getbyId(id)

        if (!verifyProfile) {
          return reply.status(404).send({ message: 'profile not found' })
        }

        const updateProfile = await profileUseCase.update(id, data)
        //to-do: criar validação dos dados enviados no Body

        if (!updateProfile) {
          return reply.status(404).send({ message: 'Error' })
        }
        return reply.send(updateProfile)
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

        if (!id) {
          return reply.send({ message: 'id is requerid' })
        }
        await profileUseCase.remove(id)
        return reply.status(200).send({ Message: 'User deleted' })
      } catch (error) {
        reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )
}
