import { FastifyInstance } from 'fastify'
import { UserUseCase } from '../usecases/user.usecase'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import generateHash from '../usecases/auth.usecase'
import { ProfileUseCase } from '../usecases/profile.usecase'
import { CreateProfileWithUser } from '../interfaces/profile.interface'

interface Auth {
  email: string
  password: string
}
export async function auth(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()
  const profileUseCase = new ProfileUseCase()

  const jwt_secret = process.env.JWT_SECRET
  env.config()

  fastify.post<{ Body: Auth }>('/', async (req, reply) => {
    const { email, password } = req.body

    const user = await userUseCase.getByEmail(email)

    if (!user || !password) {
      return reply.status(400).send('Credencias invalidas')
    }
    const validateEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i

    if (!validateEmail.test(email)) {
      return reply.status(400).send({ error: 'Formato de email inválido' })
    }

    if (!jwt_secret)
      return reply.send(
        'JWT_SECRET não está definido nas variáveis de ambiente'
      )

    try {
      const passwordMatches = await bcryptjs.compare(password, user.password)

      if (passwordMatches) {
        const token = jwt.sign({ id: user.id, email: user.email }, jwt_secret, {
          expiresIn: '1h',
        })

        reply.send({ email, token })
      } else {
        return reply.status(400).send('Credencias invalidas')
      }
    } catch (err) {
      return reply.status(400).send('Credencias invalidas')
    }
  })

  fastify.post<{ Body: CreateProfileWithUser }>(
    '/register',
    async (req, reply) => {
      const { email, password, name, tel, age, sex, cpf, marital_status } =
        req.body

      if (!jwt_secret)
        return reply.send(
          'JWT_SECRET não está definido nas variáveis de ambiente'
        )

      try {
        const verifyUser = await userUseCase.getByEmail(email)

        if (verifyUser) {
          return reply.status(400).send('Email já cadastrado')
        }

        const user = await userUseCase.create({
          email,
          password: await generateHash(password),
        })

        const profile = await profileUseCase.create({
          userID: user.id,
          name,
          tel,
          age,
          sex,
          cpf,
          marital_status,
        })

        const token = jwt.sign({ email: user.email }, jwt_secret, {
          expiresIn: '1h',
        })

        return reply.status(201).send({
          message: 'Usuario criado com sucesso',
          user,
          profile,
          token,
        })
      } catch (error) {
        return reply.status(500).send('Erro ao cadastrar usuário')
      }
    }
  )
}
