import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAddCategoryProductsUseCase } from '@/use-cases/factories/categories/make-add-category-products-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function addCategoryProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const addCategoryProducts = z.object({
    id: z.string().transform((value) => {
      const id = parseInt(value, 10)
      return id
    }),
  })

  const { id } = addCategoryProducts.parse(request.params)

  const addCategoryProductsBodySchema = z.object({
    productIds: z.array(z.number()),
  })

  const { productIds } = addCategoryProductsBodySchema.parse(request.body)

  try {
    const addCategoryProductsUseCase = makeAddCategoryProductsUseCase()

    await addCategoryProductsUseCase.execute({
      categoryId: id,
      productIds,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }

  return reply.status(201).send()
}
