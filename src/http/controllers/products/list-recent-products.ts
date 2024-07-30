import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListRecentProductsUseCase } from '@/use-cases/factories/products/make-list-recent-products-use-case'

export async function listRecentProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listRecentProductsUseCase = makeListRecentProductsUseCase()

    const prismaResponse = await listRecentProductsUseCase.execute()

    // Transform the price fields from string to float
    const products = prismaResponse.products.map((product) => ({
      ...product,
      price_wholesale: product.price_wholesale
        ? parseFloat(product.price_wholesale.toString())
        : null,
      price_retail: product.price_retail
        ? parseFloat(product.price_retail.toString())
        : null,
      cost: product.cost ? parseFloat(product.cost.toString()) : null,
    }))

    return reply.status(201).send({ products })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
