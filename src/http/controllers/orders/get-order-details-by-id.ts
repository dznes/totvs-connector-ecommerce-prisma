import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrderByIdUseCase } from '@/use-cases/factories/orders/make-get-order-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOrderDetailsById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const GetOrderDetailsByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = GetOrderDetailsByIdParamsSchema.parse(request.params)

  try {
    const listOrdersByUserId = makeGetOrderByIdUseCase()
    const { order } = await listOrdersByUserId.execute({ id })

    return reply.status(200).send({ order })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
