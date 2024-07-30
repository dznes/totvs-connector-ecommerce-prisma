import { SkusRepository } from '@/repositories/skus-repository'
import { Sku } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetSkuBySlugUseCaseRequest {
  skuSlug: string
}

interface GetSkuBySlugUseCaseResponse {
  sku: Sku
}

export class GetSkuBySlugUseCase {
  constructor(private skusRepository: SkusRepository) {}

  async execute({
    skuSlug,
  }: GetSkuBySlugUseCaseRequest): Promise<GetSkuBySlugUseCaseResponse> {
    const sku = await this.skusRepository.findBySlug(skuSlug)

    if (!sku) {
      throw new ResourceNotFoundError()
    }

    return { sku }
  }
}
