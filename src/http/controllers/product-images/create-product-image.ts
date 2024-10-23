import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateProductImageUseCase } from '@/use-cases/factories/product-images/make-create-product-image-use-case'

export async function productImageBackup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    code: z.string().optional(),
    title: z.string(),
    file_key: z.string().optional(),
    color: z.string().optional(),
    slug: z.string().optional(),
    content_type: z.string().optional(),
    position: z.number().optional(),
    skuCode: z.string(),
  })

  const {
    code,
    title,
    file_key,
    color,
    slug,
    content_type,
    position,
    skuCode,
  } = bodySchema.parse(request.query)

  const createProductImageUseCase = makeCreateProductImageUseCase()

  const { productImage } = await createProductImageUseCase.execute({
    code,
    title,
    file_key,
    color,
    slug,
    content_type,
    position,
    sku_code: skuCode,
  })

  return reply.status(200).send({
    productImage,
  })
}
