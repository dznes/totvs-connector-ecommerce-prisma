import { fetchToken, getProductInfos } from '@/http/lib/totvs'
import { makeUpsertSkuUseCase } from '@/use-cases/factories/skus/make-upsert-sku-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * skuDetailsBackup function to fetch and upsert SKU details.
 * @param _: FastifyRequest - The incoming request object (not used).
 * @param reply: FastifyReply - The response object to send the response.
 */
export async function skuDetailsBackup(_: FastifyRequest, reply: FastifyReply) {
  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const pageSize = 500
    const daysStartFromToday = 10
    const daysEndFromToday = 0
    let page = 1
    let isLastPage = false

    // Create an instance of the upsert SKU use case
    const upsertSkuUseCase = makeUpsertSkuUseCase()

    // Loop until the last page is reached
    while (!isLastPage) {
      // Fetch the product infos (SKU details) from the API with the specified parameters
      const { items, hasNext } = await getProductInfos({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })

      // Upsert each SKU detail into the database
      items.map(async (item) => {
        await upsertSkuUseCase.execute({
          code: item.productCode.toString(), // Convert productCode to string as it is a number in the API response
          status: 200, // FIXME: This should be dynamic based on real status
          title: item.productName,
          ean: item.productSku ?? '', // Use SKU if available
          ncm: item.ncm,
          mpn: item.productSku ?? '', // Use SKU if available
          reference_id: item.referenceId.toString(), // Convert referenceId to string
          reference_name: item.referenceName,
          integration_code: 'TOTVS',
          colorCode: item.colorCode,
          colorTitle: item.colorName,
          sizeCode: item.size,
          is_active: item.isActive,
          is_finished_product: item.isFinishedProduct,
          is_raw_material: item.isRawMaterial,
          is_bulk_material: item.isBulkMaterial,
          is_own_production: item.isOwnProduction ?? false, // FIXME: Prisma default is false but getting error if not set
          is_blocked: item.isBlocked,
        })
      })

      // Check if there are more pages to fetch
      if (!hasNext) {
        isLastPage = true
      } else {
        page++
      }
    }

    // Return the number of pages processed in the API response
    return reply.status(200).send(JSON.stringify({ pages: page }))
  } catch (err) {
    console.error(err)
    // Return an HTTP error response in case of failure
    return reply.status(500).send({ error: 'Failed to fetch SKU details' })
  }
}
