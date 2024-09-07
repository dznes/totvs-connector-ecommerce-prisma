import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListPhonesUseCase } from '@/use-cases/factories/phones/make-list-phones-use-case'

export async function listPhones(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listPhonesUseCase = makeListPhonesUseCase()

    const { phone } = await listPhonesUseCase.execute()
    return reply.status(201).send({ phone })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
