import { FastifyInstance } from 'fastify'
import { UseCaseComplaint } from '../usecases/complaint.usecase'
import {
  CreateComplaint,
  UpdatedComplaint,
} from '../interfaces/complaint.interface'

export async function complaintRoute(fastify: FastifyInstance) {
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

  fastify.get('/', async (req, replay) => {
    try {
      const complaint = await complaintUseCase.getAll()
      return replay.send(complaint)
    } catch (error) {
      console.error(error)
      return replay.status(500).send({ message: 'Internal server error' })
    }
  })

  fastify.put<{ Params: { id: string }; Body: UpdatedComplaint }>(
    '/:id',
    async (req, reply) => {
      try {
        const { id } = req.params
        const data = req.body
        const updatedComplaint = await complaintUseCase.update(id, data)
        return reply.send(updatedComplaint)
      } catch (error) {
        console.error(error)
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  fastify.delete('/:id', async (req, reply) => {
    try {
      const { id } = req.params as { id: string }
      await complaintUseCase.delete(id)
      reply.status(200).send({ message: 'Complaint deleted' })
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ message: 'Internal server error' })
    }
  })
}
