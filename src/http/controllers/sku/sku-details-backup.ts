import { fetchToken, getProductInfos } from '@/http/lib/totvs'
import { makeUpsertSkuUseCase } from '@/use-cases/factories/skus/make-upsert-sku-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'


export async function skuDetailsBackup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = await fetchToken()
    const pageSize = 100
    let page = 1
    let sku_details: SkuDetail[] = []

    // Fetch the initial page to get the total number of pages.
    const initialData = await getProductInfos({
      token: token.access_token,
      page,
      pageSize,
    })
    sku_details = sku_details.concat(initialData.items)
    const totalPages = initialData.totalPages

    // Fetch remaining pages
    for (page = 2; page <= pageSize; page++) {
      const data = await getProductInfos({
        token: token.access_token,
        page,
        pageSize,
      })
      const sku_detail = data.items
      sku_details = sku_details.concat(sku_detail) // Accumulate items from each page
      console.log(`${sku_details.length} items processados.`)
    }

    const upsertSkuUseCase = makeUpsertSkuUseCase()

    // // Save all items to JSON file
    // await updateJsonFile('skus.json', sku_details);
    sku_details.map((skuDetail) => {
      upsertSkuUseCase.execute({
        code: skuDetail.productCode.toString(),
        status: 200,
        title: skuDetail.productName,
        ean: skuDetail.productSku ?? '',
        ncm: skuDetail.ncm,
        mpn: skuDetail.productSku ?? '',
        reference_id: skuDetail.referenceId.toString(),
        reference_name: skuDetail.referenceName,
        integration_code: "TOTVS",
        colorCode: skuDetail.colorCode,
        colorTitle: skuDetail.colorName,
        sizeCode: skuDetail.size,
      })
    })

    // Return the complete list of items in the API response
    return reply
      .status(200)
      .send(JSON.stringify({ sku_details, totalPages }))
  } catch (err) {
    console.log(err)
    // It's better to return an HTTP error response
    return reply.status(500).send({ error: 'Failed to fetch sku details' })
  }
}
