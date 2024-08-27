import { fetchToken, getProductPrices } from '@/http/lib/totvs'
import { makeUpdateSkuPricesUseCase } from '@/use-cases/factories/skus/make-update-sku-prices-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * skuPricesBackup function to fetch and upsert SKU prices.
 * @param _: FastifyRequest - The incoming request object (not used).
 * @param reply: FastifyReply - The response object to send the response.
 */
export async function skuPricesBackup(_: FastifyRequest, reply: FastifyReply) {
  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const pageSize = 500
    const daysStartFromToday = 3
    const daysEndFromToday = 0
    let page = 1
    let isLastPage = false

    // Create an instance of the update SKU prices use case
    const updateSkuPricesUseCase = makeUpdateSkuPricesUseCase()

    // Loop until the last page is reached
    while (!isLastPage) {
      // Fetch the product prices from the API with the specified parameters
      const { items, hasNext } = await getProductPrices({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })

      // Upsert each SKU price into the database
      items.map(async (item) => {
        await updateSkuPricesUseCase.execute({
          code: item.productCode.toString(), // Convert productCode to string as it is a number in the API response
          price_retail: item.prices[0].price, // Retail price
          promo_price_retail: item.prices[0].promotionalPrice, // Retail promotional price
          price_wholesale: item.prices[1].price, // Wholesale price
          promo_price_wholesale: item.prices[1].promotionalPrice, // Wholesale promotional price
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
    return reply.status(500).send({ error: 'Failed to fetch SKU prices' })
  }
}
