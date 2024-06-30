import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { userRoutes } from './routes/user.routes'
import { postBlogRoutes } from './routes/postBlog.routes'
import { ComplaintRepositoryPrisma } from './repositories/complaint.repository'
import { complaintRoutes } from './routes/complaint.routes'
import { locationRoutes } from './routes/location.routes'

dotenv.config()

const server: FastifyInstance = fastify({ logger: true })

server.register(userRoutes, {
  prefix: '/users',
})

server.register(postBlogRoutes, {
  prefix: '/post-blog',
})

server.register(complaintRoutes, {
  prefix: '/complaint',
})

server.register(locationRoutes, {
  prefix: '/location',
})

server.listen(
  {
    port: 3000,
  },
  () => console.log('Server is running on port 3000')
)
