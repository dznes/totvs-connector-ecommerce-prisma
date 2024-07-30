import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListSkuByProductIdUseCase } from '@/use-cases/factories/skus/make-list-sku-by-product-id-use-case'

export async function listByproductId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const GetProductBySlugParamsSchema = z.object({
    productId: z.string().transform((value) => parseInt(value, 10)),
  })

  const { productId } = GetProductBySlugParamsSchema.parse(request.params)

  try {
    const listSkuByProductId = makeListSkuByProductIdUseCase()

    const skus = await listSkuByProductId.execute(productId)
    return reply.status(200).send({ skus })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
