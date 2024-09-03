import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchOrdersUseCase } from '@/use-cases/factories/orders/make-search-orders-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchOrdersQuerySchema = z.object({
    q: z.string(),
    totvsStatus: z.string().default(''),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
    operationCode: z.string().optional().default(''),
  })

  const { q, totvsStatus, operationCode, page, perPage } =
    searchOrdersQuerySchema.parse(request.query)

  const searchOrdersUseCase = makeSearchOrdersUseCase()

  const { orders, count, totalPages } = await searchOrdersUseCase.execute({
    query: q,
    totvsStatus,
    operationCode,
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
