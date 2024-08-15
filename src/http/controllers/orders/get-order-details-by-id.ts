import { prisma } from '@/lib/prisma'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
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
    const orderDetails = prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        order_items: true,
        shipping_address: true,
        transactions: true,
      },
    })

    if (!orderDetails) {
      throw new ResourceNotFoundError()
    }

    return reply.status(200).send({ orderDetails })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
