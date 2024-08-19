import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListOrderItemsUseCase } from '@/use-cases/factories/order-items/make-list-order-items-use-case'

export async function listOrderItems(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listOrderItemsUseCase = makeListOrderItemsUseCase()

    const { orderItems } = await listOrderItemsUseCase.execute()
    return reply.status(201).send({ orderItems })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
