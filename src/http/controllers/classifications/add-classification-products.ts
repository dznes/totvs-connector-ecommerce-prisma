import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAddClassificationProductsUseCase } from '@/use-cases/factories/classifications/make-add-classification-products-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function addClassificationProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const addClassificationProducts = z.object({
    id: z.string().transform((value) => {
      const id = parseInt(value, 10)
      return id
    }),
  })

  const { id } = addClassificationProducts.parse(request.params)

  const addClassificationProductsBodySchema = z.object({
    productIds: z.array(z.number()),
  })

  const { productIds } = addClassificationProductsBodySchema.parse(request.body)

  try {
    const addClassificationProductsUseCase =
      makeAddClassificationProductsUseCase()

    await addClassificationProductsUseCase.execute({
      classificationId: id,
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
