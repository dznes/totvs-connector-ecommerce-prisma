import { fetchToken, getProductPrices } from '@/http/lib/totvs'
import { makeUpdateSkuPricesUseCase } from '@/use-cases/factories/skus/make-update-sku-prices'
import { FastifyReply, FastifyRequest } from 'fastify'

export interface Price {
  branchCode: number
  priceCode: number
  priceName: string
  price: number
  promotionalPrice: number
  promotionalInformation: string | null
  informationOtherPromotions: string | null
}

export interface ProductPrice {
  productCode: number
  prices: Price[]
}

export async function skuPricesBackup(
  _: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = await fetchToken()
    const pageSize = 500
    let page = 1
    const daysStartFromToday = 100
    const daysEndFromToday = 0 
    let skuPrices: ProductPrice[] = []

    // Fetch the initial page to get the total number of pages.
    const initialData = await getProductPrices({
      token: token.access_token,
      page,
      pageSize,
      daysStartFromToday,
      daysEndFromToday,
    })
    skuPrices = skuPrices.concat(initialData.items)
    const totalPages = initialData.totalPages

    // Fetch remaining pages
    for (page = 2; page <= totalPages; page++) {
      const data = await getProductPrices({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })
      const pageSkus = data.items
      skuPrices = skuPrices.concat(pageSkus) // Accumulate items from each page
      console.log(`${skuPrices.length} items processados.`)
    }

    const updateSkuPricesUseCase = makeUpdateSkuPricesUseCase()

    // Update product prices in Database
    skuPrices.map((skuPrice) => {
      updateSkuPricesUseCase.execute({
        code: skuPrice.productCode.toString(),
        price_retail: skuPrice.prices[0].price,
        promo_price_retail: skuPrice.prices[0].promotionalPrice,
        price_wholesale: skuPrice.prices[1].price,
        promo_price_wholesale: skuPrice.prices[1].promotionalPrice,
      })
    })

    const skusCount = skuPrices.length

    // Return the complete list of items in the API response
    return reply.status(200).send(JSON.stringify({ skusCount, totalPages }))
  } catch (err) {
    console.log(err)
    // It's better to return an HTTP error response
    return reply.status(500).send({ error: 'Failed to fetch product details' })
  }
}
