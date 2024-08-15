import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListOrdersUseCase } from '@/use-cases/factories/orders/make-list-orders-use-case'

export async function listOrders(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listOrdersUseCase = makeListOrdersUseCase()

    const { order } = await listOrdersUseCase.execute()
    return reply.status(201).send({ order })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
