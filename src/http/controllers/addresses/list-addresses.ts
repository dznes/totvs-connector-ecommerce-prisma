import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListAddressesUseCase } from '@/use-cases/factories/addresses/make-list-addresses-use-case'

export async function listAddresses(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listAddressesUseCase = makeListAddressesUseCase()

    const { addresses } = await listAddressesUseCase.execute()
    return reply.status(201).send({ addresses })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
