import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchProductsUseCase } from '@/use-cases/factories/products/make-search-products-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchProductsQuerySchema = z.object({
    q: z.string(),
    productCode: z.string().default(''),
    integrationCode: z.string().default(''),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(21),
  })

  const { q, productCode, integrationCode, page, perPage } =
    searchProductsQuerySchema.parse(request.query)

  const searchProductsUseCase = makeSearchProductsUseCase()

  const { products, count, totalPages } = await searchProductsUseCase.execute({
    query: q,
    productCode,
    integrationCode,
    page,
    perPage,
  })

  return reply.status(200).send({
    products,
    count,
    perPage,
    totalPages,
  })
}
