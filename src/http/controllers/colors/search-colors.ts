import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchColorsUseCase } from '@/use-cases/factories/colors/make-search-colors-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchColorsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = searchColorsQuerySchema.parse(request.query)

  const searchColorsUseCase = makeSearchColorsUseCase()

  const { colors, count, totalPages } = await searchColorsUseCase.execute({
    query: q,
    page,
    perPage,
  })

  return reply.status(200).send({
    colors,
    count,
    perPage,
    totalPages,
  })
}
