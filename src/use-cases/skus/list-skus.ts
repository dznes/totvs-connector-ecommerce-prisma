import { SkusRepository } from '@/repositories/skus-repository'
import { Sku } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListSkusUseCaseResponse {
  sku: Sku[]
}

export class ListSkusUseCase {
  constructor(private skusRepository: SkusRepository) {}

  async execute(): Promise<ListSkusUseCaseResponse> {
    const sku = await this.skusRepository.list()

    if (!sku) {
      throw new ResourceNotFoundError()
    }

    return { sku }
  }
}
