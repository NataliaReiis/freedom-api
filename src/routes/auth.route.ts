import { FastifyInstance } from 'fastify'
import { UserUseCase } from '../usecases/user.usecase'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

interface Auth {
  email: string
  password: string
}
export async function auth(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  env.config()

  fastify.post<{ Body: Auth }>('/', async (req, reply) => {
    const { email, password } = req.body
    const user = await userUseCase.findByEmail(email)
    const jwt_secret = process.env.JWT_SECRET

    if (!user || !password) {
      return reply.status(400).send('Credencias invalidas')
    }

    if (!jwt_secret)
      return reply.send(
        'JWT_SECRET não está definido nas variáveis de ambiente'
      )
    try {
      const passwordMatches = bcryptjs.compareSync(password, user.password)

      if (passwordMatches) {
        const token = jwt.sign({ email }, jwt_secret, {
          expiresIn: 3600,
        })
        reply.send({ email, token })
      } else {
        return reply.status(400).send('Credencias invalidas')
      }
    } catch (err) {
      return reply.status(400).send('Credencias invalidas')
    }
  })
}
