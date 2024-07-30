import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetSkuBySlugUseCase } from '@/use-cases/factories/skus/make-get-sku-by-slug-use-case'

export async function getBySlug(request: FastifyRequest, reply: FastifyReply) {
  const GetSkuBySlugParamsSchema = z.object({
    skuSlug: z.string(),
  })

  const { skuSlug } = GetSkuBySlugParamsSchema.parse(request.params)

  try {
    const getSkuBySlugUseCase = makeGetSkuBySlugUseCase()

    const { sku } = await getSkuBySlugUseCase.execute({
      skuSlug,
    })
    return reply.status(200).send({ sku })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
