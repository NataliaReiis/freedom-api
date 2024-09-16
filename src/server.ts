import fastify, { FastifyInstance } from 'fastify'
import dotenv from 'dotenv'
import { userRoute } from './routes/user.route'
import { postBlogRoute } from './routes/postBlog.route'
import { complaintRoute } from './routes/complaint.route'
import { locationRoute } from './routes/location.route'
import { commentRoute } from './routes/comment.route'
import { auth } from './routes/auth.route'

dotenv.config()

const server: FastifyInstance = fastify({ logger: true })

server.register(userRoute, {
  prefix: '/users',
})

server.register(auth, {
  prefix: '/autentication',
})

server.register(postBlogRoute, {
  prefix: '/post-blog',
})

server.register(complaintRoute, {
  prefix: '/complaint',
})

server.register(locationRoute, {
  prefix: '/location',
})

server.register(commentRoute, {
  prefix: '/comment',
})

server.listen(
  {
    port: 3000,
  },
  () => console.log('Server is running on port 3000')
)
