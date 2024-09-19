import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListClassificationsByTypeCodeUseCase } from '@/use-cases/factories/classifications/make-list-classifications-by-type-code'
import { fetchToken, getProductCodesByClassification } from '@/http/lib/totvs'
import { makeAddClassificationProductsBySkuCodesUseCase } from '@/use-cases/factories/classifications/make-add-classification-products-by-sku-codes-use-case'

export async function linkProductsByClassificationTypeCode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    classificationTypeCode: z.string()
  })

  const { classificationTypeCode } = bodySchema.parse(request.body)

  try {
    let page = 1
    let isLastPage = false
    const token = await fetchToken()
    const listClassificationsByTypeCodeUseCase = makeListClassificationsByTypeCodeUseCase()
    const addClassificationProductsBySkuCodesUseCase = makeAddClassificationProductsBySkuCodesUseCase()

    const { classifications } = await listClassificationsByTypeCodeUseCase.execute({
      typeCode: classificationTypeCode,
    })

    for (const classification of classifications) {
      // // Loop until the last page is reached
      // while (!isLastPage) {
        const { items, hasNext } = await getProductCodesByClassification({ 
          token: token.access_token,
          page,
          classificationTypeCode: Number(classification.type_code),
          classificationCode: classification.code
        })

        const skuCodes = items.map((item) => item.productCode)

        await addClassificationProductsBySkuCodesUseCase.execute({
          classificationId: classification.id,
          skuCodes,
        })
        
      //   // Check if there are more pages to fetch
      //   if (!hasNext) {
      //     isLastPage = true
      //   } else {
      //     page++
      //   }
      // }
    }

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }

  return reply.status(201).send()
}
