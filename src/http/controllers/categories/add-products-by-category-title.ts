import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeAddProductsByCategoryTitleProductsUseCase } from '@/use-cases/factories/categories/make-add-products-matching-category-by-title-use-case'

export async function addProductsByCategoryTitle(
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

  try {
    const addProductsByCategoryTitleProducts =
      makeAddProductsByCategoryTitleProductsUseCase()

    await addProductsByCategoryTitleProducts.execute({
      categoryId: id,
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
