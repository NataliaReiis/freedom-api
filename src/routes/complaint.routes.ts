import { FastifyInstance } from 'fastify'
import { UseCaseComplaint } from '../usecases/complaint.usecase'
import {
  CreateComplaint,
  UpdatedComplaint,
} from '../interfaces/complaint.interface'

export async function complaintRoutes(fastify: FastifyInstance) {
  const complaintUseCase = new UseCaseComplaint()

  fastify.post<{ Body: CreateComplaint }>('/', async (req, reply) => {
    const {
      description,
      typeComplaint,
      nivelComplaint,
      imageComplaint,
      locationId,
      userId,
    } = req.body
    try {
      const data = await complaintUseCase.create({
        description,
        typeComplaint,
        nivelComplaint,
        imageComplaint,
        locationId,
        userId,
      })
      return reply.send(data)
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ message: 'Internal server error' })
    }
  })
}
