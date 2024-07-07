import fastify, { FastifyInstance } from 'fastify'
import dotenv from 'dotenv'
import { userRoutes } from './routes/user.routes'
import { postBlogRoutes } from './routes/postBlog.routes'
import { complaintRoutes } from './routes/complaint.routes'
import { locationRoutes } from './routes/location.routes'
import { commentRoutes } from './routes/comment.routes'

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

server.register(commentRoutes, {
  prefix: '/comment',
})

server.listen(
  {
    port: 3000,
  },
  () => console.log('Server is running on port 3000')
)
