import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetProductByIdUseCase } from '@/use-cases/factories/products/make-get-product-by-id-use-case'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const GetProductByIdParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = GetProductByIdParamsSchema.parse(request.params)

  try {
    const getProductByIdUseCase = makeGetProductByIdUseCase()

    const { product } = await getProductByIdUseCase.execute({
      id,
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
