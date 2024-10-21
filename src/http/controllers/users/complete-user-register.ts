import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { createRetailClient, createWholesaleClient, fetchTestEnvToken } from '@/http/lib/totvs'
import { makeRegisterTotvsUserUseCase } from '@/use-cases/factories/users/make-register-totvs-user-use-case'

export async function registerTotvsUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const registerBodySchema = z.object({
    name: z.string(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    cnpj: z.string().optional(),
    birthDate: z.string(),
    gender: z.string(),
    isInactive: z.boolean(),
    email: z.string(),
    password: z.string(),
  })

  const {
    name,
    cpf,
    rg,
    cnpj,
    birthDate,
    gender,
    isInactive,
    email,
    password,
  } = registerBodySchema.parse(request.body)

  try {
    // Fetch the authentication token
    const token = await fetchTestEnvToken()
    const registerTotvsUserUseCase = makeRegisterTotvsUserUseCase()

    if (cpf?.length === 11) {
      const customerCode = await createRetailClient({
        token: token.access_token,
        name,
        cpf,
        rg,
        birthDate,
        gender,
        isInactive,
        email,
      })
  
      const { user } = await registerTotvsUserUseCase.execute({
        code: customerCode.toString(),
        name,
        email,
        regitered_at: new Date(),
        rg: rg ?? '',
        birthDate,
        cpf,
        cnpj: '',
        gender,
        password,
      })
  
      return reply.status(201).send({ user })
    }

    if (cnpj?.length === 14) {
      const customerCode = await createWholesaleClient({
        token: token.access_token,
        name,
        cpf,
        rg,
        birthDate,
        gender,
        isInactive,
        email,
      })
      const { user } = await registerTotvsUserUseCase.execute({
        code: customerCode.toString(),
        name,
        email,
        regitered_at: new Date(),
        birthDate,
        cpf: '',
        cnpj,
        gender,
        password,
      })
  
      return reply.status(201).send({ user })
    }

  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  
}
