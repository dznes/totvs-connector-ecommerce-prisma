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
      items.map((item: SkuDetail) => {
        upsertSkuUseCase.execute({
          code: item.productCode.toString(), // productCode is number in the API response
          status: 200, // FIXME: This should be dynamic
          title: item.productName,
          ean: item.productSku ?? '',
          ncm: item.ncm,
          mpn: item.productSku ?? '',
          reference_id: item.referenceId.toString(),
          reference_name: item.referenceName,
          integration_code: 'TOTVS',
          colorCode: item.colorCode,
          colorTitle: item.colorName,
          sizeCode: item.size,
          is_active: item.isActive,
          is_finished_product: item.isFinishedProduct,
          is_raw_material: item.isRawMaterial,
          is_bulk_material: item.isBulkMaterial,
          is_own_production: item.isOwnProduction,
          is_blocked: item.isBlocked,
        })
      })

      // Break the loop if there are no more pages to fetch
      if (!hasNext) {
        hasNextValidator = false
        break
      }

      page++
    }

    // Return pages processed in the API response
    return reply.status(200).send(JSON.stringify({ pages: page }))
  } catch (err) {
    // FIXME: For better error handling and response.
    return reply.status(500).send({ error: 'Failed to fetch sku details' })
  }
}
