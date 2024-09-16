import 'fastify'

interface JwtPayload {
  email: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload
    email: string
  }
}
