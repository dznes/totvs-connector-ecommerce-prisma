import { SkusRepository } from '@/repositories/skus-repository'
import { Sku } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListSkuByProductIdUseCaseResponse {
  skus: Sku[]
}

export class ListSkuByProductIdUseCase {
  constructor(private skusRepository: SkusRepository) {}

  async execute(productId: number): Promise<ListSkuByProductIdUseCaseResponse> {
    const skus = await this.skusRepository.listByProductId(productId)

    if (!skus) {
      throw new ResourceNotFoundError()
    }

    return { skus }
  }
}
