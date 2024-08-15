import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrderBySlugUseCase } from '@/use-cases/factories/orders/make-list-orders-by-user-id-use-case'

export async function listByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const GetUserBySlugParamsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = GetUserBySlugParamsSchema.parse(request.params)

  try {
    const listOrdersByUserId = makeGetOrderBySlugUseCase()

    const orders = await listOrdersByUserId.execute(userId)
    return reply.status(200).send({ orders })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
