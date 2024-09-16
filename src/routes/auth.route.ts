import { FastifyInstance } from 'fastify'
import { UserUseCase } from '../usecases/user.usecase'
import bcryptjs from 'bcryptjs'
interface Auth {
  email: string
  password: string
}
export async function auth(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  fastify.post<{ Body: Auth }>('/', async (req, reply) => {
    const { email, password } = req.body
    const user = await userUseCase.findByEmail(email)
    if (!user || !password) {
      reply.status(400).send('Credencias invalidas')
    } else if (bcryptjs.compareSync(password, user.password)) {
      reply.send('Usuário autenticado')
    } else {
      reply.status(400).send('Credencias inválidas')
    }
  })
}
