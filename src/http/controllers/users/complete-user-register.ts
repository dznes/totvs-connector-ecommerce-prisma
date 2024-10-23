import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { createRetailClient, createWholesaleClient, fetchTestEnvToken } from '@/http/lib/totvs'
import { makeRegisterTotvsUserUseCase } from '@/use-cases/factories/users/make-register-totvs-user-use-case'
import { CodeAlreadyExistsError } from '@/use-cases/errors/totvs-code-already-exists-error'
import { makeFindUserWithSameCpfUseCase } from '@/use-cases/factories/users/make-find-user-with-same-cpf-use-case'
import { makeFindUserWithSameCnpjUseCase } from '@/use-cases/factories/users/make-find-user-with-same-cnpj-use-case'

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
    isInactive: z.boolean().optional().default(false),
    email: z.string(),
    password: z.string(),
    utm_campaign: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    referrer: z.string().optional(),
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
    utm_campaign,
    utm_source,
    utm_medium,
    utm_content,
    utm_term,
    referrer,
  } = registerBodySchema.parse(request.body)

  try {
    // Fetch the authentication token
    const token = await fetchTestEnvToken()
    const registerTotvsUserUseCase = makeRegisterTotvsUserUseCase()
    const findUserWithSameCpfUseCase = makeFindUserWithSameCpfUseCase()
    const findUserWithSameCnpjUseCase = makeFindUserWithSameCnpjUseCase()

    if (cpf?.length === 11) {

      // Check if user CPF already exists
      const userWithExistingCpf = await findUserWithSameCpfUseCase.execute({ cpf })
      if (userWithExistingCpf) {
        return reply.status(409).send({ message: 'Cpf already exists' })
      }
      
      // Register user in TOTVS
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
  
      // Register user in Database
      const { user } = await registerTotvsUserUseCase.execute({
        code: `totvs-${customerCode.toString()}`,
        name,
        email,
        regitered_at: new Date(),
        rg: rg ?? '',
        birthDate,
        cpf,
        cnpj: '',
        gender,
        password,
        utm_campaign,
        utm_source,
        utm_medium,
        utm_content,
        utm_term,
        referrer,
      })
  
      return reply.status(201).send({ user })
    }

    if (cnpj?.length === 14) {

      // Check if user CPF already exists
      const userWithExistingCnpj = await findUserWithSameCnpjUseCase.execute({ cnpj })
      if (userWithExistingCnpj) {
        return reply.status(409).send({ message: 'Cnpj already exists' })
      }
            
      // Register user in TOTVS
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

      // Register user in Database
      const { user } = await registerTotvsUserUseCase.execute({
        code: `totvs-${customerCode.toString()}`,
        name,
        email,
        regitered_at: new Date(),
        birthDate,
        cpf: '',
        cnpj,
        gender,
        password,
        utm_campaign,
        utm_source,
        utm_medium,
        utm_content,
        utm_term,
        referrer,
      })
  
      return reply.status(201).send({ user })
    }

  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof CodeAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  
}
