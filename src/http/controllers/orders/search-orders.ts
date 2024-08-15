import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchOrdersUseCase } from '@/use-cases/factories/orders/make-search-orders-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchOrdersQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = searchOrdersQuerySchema.parse(request.query)

  const searchOrdersUseCase = makeSearchOrdersUseCase()

  const { orders, count, totalPages } = await searchOrdersUseCase.execute({
    query: q,
    page,
    perPage,
  })

  return reply.status(200).send({
    orders,
    count,
    perPage,
    totalPages,
  })
}
