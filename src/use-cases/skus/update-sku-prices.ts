import { convertToDecimal } from '@/core/entities/value-objects/convert-to-decimal'
import { SkusRepository } from '@/repositories/skus-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateSkuPricesUseCaseRequest {
  code: string
  price_retail?: number
  promo_price_retail?: number
  price_wholesale?: number
  promo_price_wholesale?: number
}

export class UpdateSkuPricesUseCase {
  constructor(private skusRepository: SkusRepository) {}

  async execute({
    code,
    price_retail,
    promo_price_retail,
    price_wholesale,
    promo_price_wholesale,
  }: UpdateSkuPricesUseCaseRequest) {
    const sku = await this.skusRepository.findByCode(code)

    if (!sku) {
      throw new ResourceNotFoundError()
    }

    const decimalPriceRetail = convertToDecimal(price_retail ?? 0)
    const decimalPromoPriceRetail = convertToDecimal(promo_price_retail ?? 0)
    const decimalPriceWholesale = convertToDecimal(price_wholesale ?? 0)
    const decimalPromoPriceWholesale = convertToDecimal(
      promo_price_wholesale ?? 0,
    )

    await this.skusRepository.update({
      ...sku,
      price_retail: decimalPriceRetail,
      promo_price_retail: decimalPromoPriceRetail,
      price_wholesale: decimalPriceWholesale,
      promo_price_wholesale: decimalPromoPriceWholesale,
      updated_at: new Date(),
    })
  }
}
