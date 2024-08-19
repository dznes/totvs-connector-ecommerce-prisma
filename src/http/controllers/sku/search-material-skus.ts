import { makeSearchMaterialSkusUseCase } from '@/use-cases/factories/skus/make-search-material-skus-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchMaterials(request: FastifyRequest, reply: FastifyReply) {
  const searchSkusQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = searchSkusQuerySchema.parse(request.query)

  const searchSkusUseCase = makeSearchMaterialSkusUseCase()

  const { skus, count, totalPages } = await searchSkusUseCase.execute({
    query: q,
    page,
    perPage,
  })

  return reply.status(200).send({
    count,
    perPage,
    totalPages,
    skus,
  })
}