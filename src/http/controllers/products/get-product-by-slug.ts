import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetProductBySlugUseCase } from '@/use-cases/factories/products/make-get-product-by-slug-use-case'

// Define the custom order for the sizes
const sizeOrder = [
  'PP',
  'P',
  'M',
  'G',
  'GG',
  'UN',
  'U',
  '36',
  '38',
  '40',
  '42',
  '44',
]

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

    const colorsRepetition = product.skus.map((sku) => sku.color)
    const colors = [
      ...new Map(colorsRepetition.map((obj) => [obj.id, obj])).values(),
    ]

    const sizesRepetition = product.skus.map((sku) => sku.size)

    // Remove duplicate sizes
    const uniqueSizes = [
      ...new Map(sizesRepetition.map((obj) => [obj.id, obj])).values(),
    ]

    // Sort the sizes based on the custom order
    const sortedSizes = uniqueSizes.sort((a, b) => {
      return sizeOrder.indexOf(a.code) - sizeOrder.indexOf(b.code)
    })

    const productWithColorsAndSizes = {
      ...product,
      colors,
      sizes: sortedSizes,
    }

    return reply.status(201).send({ product: productWithColorsAndSizes })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
