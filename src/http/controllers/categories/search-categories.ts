import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchCategoriesUseCase } from '@/use-cases/factories/categories/make-search-categories-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchCategoriesQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = searchCategoriesQuerySchema.parse(request.query)

  const searchCategoriesUseCase = makeSearchCategoriesUseCase()

  const { categories, count, totalPages } =
    await searchCategoriesUseCase.execute({
      query: q,
      page,
      perPage,
    })

  return reply.status(200).send({
    categories,
    count,
    perPage,
    totalPages,
  })
}
