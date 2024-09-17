import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateProductImageUseCase } from '@/use-cases/factories/product-images/make-update-product-image-use-case'

export async function productImageBackup(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    code: z.string(),
    title: z.string().optional(),
    file_key: z.string().optional(),
    color: z.string().optional(),
    slug: z.string().optional(),
    content_type: z.string().optional(),
    position: z.number().optional(),
    skuCode: z.string().optional(),
  })

  const { 
    code,
    title,
    file_key,
    color,
    slug,
    content_type,
    position,
    skuCode
  } = bodySchema.parse(request.query)

  const updateProductImageUseCase = makeUpdateProductImageUseCase()

  await updateProductImageUseCase.execute({
    code,
    title,
    file_key,
    color,
    slug,
    content_type,
    position,
    sku_code: skuCode,
  })

  return reply.status(200).send()
}
