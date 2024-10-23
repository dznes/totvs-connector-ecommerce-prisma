import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateProductImageUseCase } from '@/use-cases/factories/product-images/make-create-product-image-use-case'
import { makeFindProductImageByCode } from '@/use-cases/factories/product-images/make-find-product-image-by-code-use-case'
import { makeUpdateProductImageUseCase } from '@/use-cases/factories/product-images/make-update-product-image-use-case'

export async function productImageBackup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    code: z.string(),
    title: z.string(),
    file_key: z.string(),
    color: z.string(),
    slug: z.string(),
    content_type: z.string(),
    position: z.number(),
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
  const findProductImageUseCase = makeFindProductImageByCode()
  const updateProductImageUseCase = makeUpdateProductImageUseCase()

  const productImageExists = await findProductImageUseCase.execute({ code })

  if (!productImageExists) {
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
  } else {
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
}
