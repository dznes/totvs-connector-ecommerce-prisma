import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchSizesUseCase } from '@/use-cases/factories/sizes/make-search-sizes-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchSizesQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = searchSizesQuerySchema.parse(request.query)

  const searchSizesUseCase = makeSearchSizesUseCase()

  const { sizes, count, totalPages } = await searchSizesUseCase.execute({
    query: q,
    page,
    perPage,
  })

  return reply.status(200).send({
    sizes,
    count,
    perPage,
    totalPages,
  })
}
