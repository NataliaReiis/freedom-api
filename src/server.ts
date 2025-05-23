import fastify, { FastifyInstance } from 'fastify'
import dotenv from 'dotenv'
import { userRoute } from './routes/user.route'
import { postBlogRoute } from './routes/postBlog.route'
import { complaintRoute } from './routes/complaint.route'
import { locationRoute } from './routes/location.route'
import { commentRoute } from './routes/comment.route'
import { auth } from './routes/auth.route'
import authMiddleware from './middlewares/authorization'
import { profileRouter } from './routes/profile.route'

dotenv.config()

const server: FastifyInstance = fastify({ logger: true })

server.addHook('onRequest', async (req, reply) => {
  if (
    (req.routeOptions.url === '/users' ||
      req.routeOptions.url === '/auth' ||
      req.routeOptions.url === '/auth/register') &&
    req.routeOptions.method === 'POST'
  ) {
    return
  }

  if (
    req.routeOptions.url === '/profile' &&
    req.routeOptions.method === 'POST'
  ) {
    return
  }
  await authMiddleware(req, reply)
})

server.register(userRoute, {
  prefix: '/users',
})

server.register(profileRouter, {
  prefix: '/profile',
})

server.register(auth, {
  prefix: '/auth',
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
    host: '0.0.0.0',
  },
  () => console.log('Server is running on port 3000')
)
