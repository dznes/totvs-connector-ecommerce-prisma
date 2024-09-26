import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { createRetailClient, fetchTestEnvToken } from '@/http/lib/totvs'
import { makeRegisterTotvsUserUseCase } from '@/use-cases/factories/users/make-register-totvs-user-use-case'

export async function registerTotvsUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const addressSchema = z.object({
    sequence: z.number().optional(),
    addressType: z.string(),
    publicPlace: z.string().optional(),
    address: z.string(),
    number: z.number(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    cityName: z.string(),
    stateAbbreviation: z.string(),
    cep: z.string(),
  })

  const registerBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    rg: z.string().optional(),
    birthDate: z.string(),
    gender: z.string(),
    isInactive: z.boolean(),
    nationality: z.string(),
    homeTown: z.string(),
    address: addressSchema,
    phoneNumber: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const {
    name,
    cpf,
    rg,
    birthDate,
    gender,
    isInactive,
    nationality,
    homeTown,
    address,
    phoneNumber,
    email,
    password,
  } = registerBodySchema.parse(request.body)

  try {
    // Fetch the authentication token
    const token = await fetchTestEnvToken()
    const registerTotvsUserUseCase = makeRegisterTotvsUserUseCase()

    const customerCode = await createRetailClient({
      token: token.access_token,
      name,
      cpf,
      rg,
      birthDate,
      gender,
      isInactive,
      nationality,
      homeTown,
      address,
      phoneNumber,
      email,
    })

    const { user } = await registerTotvsUserUseCase.execute({
      code: customerCode.toString(),
      name,
      email,
      phone_number: phoneNumber,
      regitered_at: new Date(),
      rg: rg ?? '',
      birthDate,
      address,
      cpf,
      gender,
      password,
    })

    return { user }

  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
