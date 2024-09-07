import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListAddressesByUserIdUseCase } from '@/use-cases/factories/addresses/make-list-addresses-by-user-id-use-case'
import { z } from 'zod'

export async function listAddressesByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = registerBodySchema.parse(request.body)

  try {
    const listAddressesUseCase = makeListAddressesByUserIdUseCase()

    const address = await listAddressesUseCase.execute(userId)
    return reply.status(201).send({ address })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
