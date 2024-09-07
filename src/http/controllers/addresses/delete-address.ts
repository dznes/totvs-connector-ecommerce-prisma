import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'
import { makeDeleteAddressUseCase } from '@/use-cases/factories/addresses/make-delete-address-use-case'

export async function deleteAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    id: z.coerce.string(),
  })

  const { id } = registerBodySchema.parse(request.params)

  try {
    const registerUseCase = makeDeleteAddressUseCase()

    await registerUseCase.execute({
      id,
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
