import { SkusRepository } from '@/repositories/skus-repository'
import { Sku } from '@prisma/client'

interface SearchMaterialSkusUseCaseRequest {
  query: string
  page: number
  perPage: number
}

interface SearchMaterialSkusUseCaseResponse {
  skus: Sku[]
  count: number
  totalPages: number
}

export class SearchMaterialSkusUseCase {
  constructor(private skusRepository: SkusRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchMaterialSkusUseCaseRequest): Promise<SearchMaterialSkusUseCaseResponse> {
    const skus = await this.skusRepository.searchMaterials(query, page, perPage)
    const count = await this.skusRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      skus,
      count,
      totalPages,
    }
  }
}
