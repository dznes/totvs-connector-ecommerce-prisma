import { SkusRepository } from '@/repositories/skus-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateSkuAvailableStocksUseCaseRequest {
  code: string
  stock_available: number
}

export class UpdateSkuAvailableStocksUseCase {
  constructor(private skusRepository: SkusRepository) {}

  async execute({
    code,
    stock_available,
  }: UpdateSkuAvailableStocksUseCaseRequest) {
    const sku = await this.skusRepository.findByCode(code)

    if (sku) {
      await this.skusRepository.update({
        ...sku,
        stock_available,
        updated_at: new Date(),
      })
      console.log(`Sku ${sku.title} updated.`)
    } else {
      throw new ResourceNotFoundError()
    }
  }
}
