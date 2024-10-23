import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { z } from 'zod'
import { makeSearchProductsByCategorySlugUseCase } from '@/use-cases/factories/products/make-search-products-by-category-slug-use-case'

export async function searchProductsByCategorySlug(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const SearchProductsByCategorySlugParamsSchema = z.object({
    categorySlug: z.string(),
  })

  const { categorySlug } = SearchProductsByCategorySlugParamsSchema.parse(
    request.params,
  )

  const SearchProductsByCategorySlugQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = SearchProductsByCategorySlugQuerySchema.parse(
    request.query,
  )

  try {
    const searchCategoriesUseCase = makeSearchProductsByCategorySlugUseCase()

    const { products, count, totalPages } =
      await searchCategoriesUseCase.execute({
        categorySlug,
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
