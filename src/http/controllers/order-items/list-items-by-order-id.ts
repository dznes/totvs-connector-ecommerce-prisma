import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListItemsByOrderIdUseCase } from '@/use-cases/factories/order-items/make-list-items-by-order-id-use-case'

export async function listOrdersByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const GetUserBySlugParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = GetUserBySlugParamsSchema.parse(request.params)

  try {
    const listOrdersByUserId = makeListItemsByOrderIdUseCase()

    const { orderItems } = await listOrdersByUserId.execute(orderId)
    return reply.status(200).send({ orderItems })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
