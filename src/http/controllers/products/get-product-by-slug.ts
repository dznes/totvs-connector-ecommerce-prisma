import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetProductBySlugUseCase } from '@/use-cases/factories/products/make-get-product-by-slug'

export async function getBySlug(request: FastifyRequest, reply: FastifyReply) {
  const GetProductBySlugParamsSchema = z.object({
    productSlug: z.string(),
  })

  const { productSlug } = GetProductBySlugParamsSchema.parse(request.params)

  try {
    const getProductBySlugUseCase = makeGetProductBySlugUseCase()

    const { product } = await getProductBySlugUseCase.execute({
      productSlug,
    })
    return reply.status(201).send({ product })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
