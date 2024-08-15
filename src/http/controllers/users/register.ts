import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/users/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    password: z.string().min(6),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
    gender: z.string(),
    birth_date: z.string(),
    is_customer: z.boolean().optional(),
  })

  const {
    name,
    email,
    role,
    password,
    gender,
    birth_date,
    cpf,
    cnpj,
    is_customer,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
        name,
        email,
        role,
        password,
        gender,
        birth_date,
        cpf,
        cnpj,
        is_customer,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }

  return reply.status(201).send()
}
