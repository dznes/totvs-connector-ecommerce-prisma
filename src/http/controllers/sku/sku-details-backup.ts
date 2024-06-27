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
    let page = 1
    let daysStartFromToday = 100
    let daysEndFromToday = 100
    let skuDetails: SkuDetail[] = []

    // Fetch the initial page to get the total number of pages.
    const initialData = await getProductInfos({
      token: token.access_token,
      page,
      pageSize,
      daysStartFromToday,
      daysEndFromToday,
    })
    skuDetails = skuDetails.concat(initialData.items)
    const totalPages = initialData.totalPages
    console.log(totalPages)

    // Fetch remaining pages
    for (page = 2; page <= totalPages; page++) {
      const data = await getProductInfos({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })
      const pageSkus = data.items
      skuDetails = skuDetails.concat(pageSkus) // Accumulate items from each page
      console.log(`${skuDetails.length} items processados.`)
      // console.log(data)
    }

    const upsertSkuUseCase = makeUpsertSkuUseCase()

    // Upsert (create or update) product info in Database
    skuDetails.map((skuDetail) => {
      upsertSkuUseCase.execute({
        code: skuDetail.productCode.toString(),
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
    const skusCount = skuDetails.length

    // Return the complete list of items in the API response
    return reply.status(200).send(JSON.stringify({ skusCount, totalPages }))
  } catch (err) {
    console.log(err)
    // It's better to return an HTTP error response
    return reply.status(500).send({ error: 'Failed to fetch sku details' })
  }
}
