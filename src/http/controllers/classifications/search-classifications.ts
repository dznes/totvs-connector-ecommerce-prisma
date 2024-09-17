import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchClassificationsUseCase } from '@/use-cases/factories/classifications/make-search-classifications-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchClassificationsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = searchClassificationsQuerySchema.parse(request.query)

  const searchClassificationsUseCase = makeSearchClassificationsUseCase()

  const { classifications, count, totalPages } =
    await searchClassificationsUseCase.execute({
      query: q,
      page,
      perPage,
    })

  return reply.status(200).send({
    classifications,
    count,
    perPage,
    totalPages,
  })
}
