import { fetchToken, getProductInfos } from '@/http/lib/totvs'
import { SkuDetail } from '@/types/sku-details'
import { makeUpsertSkuUseCase } from '@/use-cases/factories/skus/make-upsert-sku-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function skuDetailsBackup(
  _: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = await fetchToken()
    const pageSize = 500
    const daysStartFromToday = 100
    const daysEndFromToday = 70
    let page = 1

    const upsertSkuUseCase = makeUpsertSkuUseCase()
    let hasNextValidator = true

    while (hasNextValidator) {
      const { items, hasNext } = await getProductInfos({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })
      // Upsert (create or update) sku info in Database before fetching more items
      items.map((skuDetail: SkuDetail) => {
        upsertSkuUseCase.execute({
          code: skuDetail.productCode.toString(), // productCode is number in the API response
          status: 200,
          title: skuDetail.productName,
          ean: skuDetail.productSku ?? '',
          ncm: skuDetail.ncm,
          mpn: skuDetail.productSku ?? '',
          reference_id: skuDetail.referenceId.toString(),
          reference_name: skuDetail.referenceName,
          integration_code: 'TOTVS',
          colorCode: skuDetail.colorCode,
          colorTitle: skuDetail.colorName,
          sizeCode: skuDetail.size,
        })
      })

      // Break the loop if there are no more pages to fetch
      if (!hasNext) {
        hasNextValidator = false
        break
      }

      page++
    }

    // Return the complete list of items in the API response
    return reply.status(200).send(JSON.stringify({ pages: page }))
  } catch (err) {
    console.log(err)
    // It's better to return an HTTP error response
    return reply.status(500).send({ error: 'Failed to fetch sku details' })
  }
}
