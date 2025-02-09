import { FastifyReply, FastifyRequest } from 'fastify'
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from 'dotenv'

env.config()

export default async function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const jwt_secret = process.env.JWT_SECRET

  if (!jwt_secret)
    return reply.send('JWT_SECRET não está definido nas variáveis de ambiente')

  try {
    const auth = req.headers.authorization

    if (!auth) {
      return reply.status(401).send('Você não tem permissão para essa ação')
    }

    const token = auth.split(' ')[1]

    if (!token) {
      return reply.status(401).send('Token não fornecido')
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) {
        reply.status(401).send('Token invalido ou expirado')
      }
      req.email = (decoded as JwtPayload).email
    })
  } catch (err) {
    reply.status(500).send('Erro interno do servidor')
  }
}
