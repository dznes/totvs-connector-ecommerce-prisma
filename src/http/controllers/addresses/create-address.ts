import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateAddressUseCase } from '@/use-cases/factories/addresses/make-create-address-use-case'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAddressBodySchema = z.object({
    userId: z.string(),
    status: z.number().optional(),
    type: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    zip_code: z.string(),
    street: z.string(),
    number: z.number(),
    neighborhood: z.string(),
    complement: z.string().optional(),
  })

  const {
    userId,
    type,
    status,
    country,
    state,
    city,
    zip_code,
    street,
    number,
    neighborhood,
    complement,
  } = createAddressBodySchema.parse(request.body)

  try {
    const createAddressUseCase = makeCreateAddressUseCase()

    await createAddressUseCase.execute({
      userId,
      status,
      type,
      country,
      state,
      city,
      zip_code,
      street,
      number,
      neighborhood,
      complement,
    })
  } catch (err) {
    if (err instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }

  return reply.status(201).send()
}
