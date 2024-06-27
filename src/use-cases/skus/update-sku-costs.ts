import { convertToDecimal } from '@/core/entities/value-objects/convert-to-decimal'
import { SkusRepository } from '@/repositories/skus-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateSkuCostUseCaseRequest {
  code: string
  cost: number
}

export class UpdateSkuCostsUseCase {
  constructor(private skusRepository: SkusRepository) {}

  async execute({ code, cost }: UpdateSkuCostUseCaseRequest) {
    const sku = await this.skusRepository.findByCode(code)

    if (sku) {
      const decimalCost = convertToDecimal(cost ?? 0)

      await this.skusRepository.update({
        ...sku,
        cost: decimalCost,
        updated_at: new Date(),
      })
      console.log(`Sku ${sku.title} updated.`)
    } else {
      throw new ResourceNotFoundError()
    }
  }
}
