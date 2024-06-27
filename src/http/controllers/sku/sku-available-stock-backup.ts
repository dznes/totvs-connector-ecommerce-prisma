import { fetchToken, getProductBalances } from '@/http/lib/totvs'
import { SkuAvailableStock } from '@/types/sku-available-stock'
import { makeUpdateSkuAvailableStocksUseCase } from '@/use-cases/factories/skus/make-update-sku-available-stocks'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * skuAvailableStocksBackup function to fetch and upsert SKU costs.
 * @param _: FastifyRequest - The incoming request object (not used).
 * @param reply: FastifyReply - The response object to send the response.
 */
export async function skuAvailableStocksBackup(
  _: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const pageSize = 500
    const daysStartFromToday = 50
    const daysEndFromToday = 0
    let page = 1
    let isLastPage = false

    // Create an instance of the update SKU costs use case
    const updateSkuAvailableStocksUseCase =
      makeUpdateSkuAvailableStocksUseCase()

    // Loop until the last page is reached
    while (!isLastPage) {
      // Fetch the product costs from the API with the specified parameters
      const { items, hasNext } = await getProductBalances({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })

      // Upsert each SKU price into the database
      items.map(async (item: SkuAvailableStock) => {
        await updateSkuAvailableStocksUseCase.execute({
          code: item.productCode.toString(), // Convert productCode to string as it is a number in the API response
          stock_available: item.balances[0].stock, // Last Purchase AvailableStock
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
    return reply.status(500).send({ error: 'Failed to fetch product details' })
  }
}
