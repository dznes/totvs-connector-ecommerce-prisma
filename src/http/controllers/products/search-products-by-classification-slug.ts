import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { z } from 'zod'
import { makeSearchProductsByClassificationSlugUseCase } from '@/use-cases/factories/products/make-search-products-by-classification-slug-use-case'

export async function searchProductsByClassificationSlug(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const SearchProductsByClassificationSlugParamsSchema = z.object({
    classificationSlug: z.string(),
  })

  const { classificationSlug } = SearchProductsByClassificationSlugParamsSchema.parse(request.params)

  const SearchProductsByClassificationSlugQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = SearchProductsByClassificationSlugQuerySchema.parse(
    request.query,
  )

  try {
    const searchClassificationsUseCase = makeSearchProductsByClassificationSlugUseCase()

    const { products, count, totalPages } =
      await searchClassificationsUseCase.execute({
        classificationSlug,
        query: q,
        page,
        perPage,
      })
    return reply.status(201).send({
      products,
      count,
      perPage,
      totalPages,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
