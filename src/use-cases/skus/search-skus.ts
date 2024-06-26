import { SkusRepository } from '@/repositories/skus-repository'
import { Sku } from '@prisma/client'

interface SearchSkusUseCaseRequest {
  query: string
  page: number
  perPage: number
}

interface SearchSkusUseCaseResponse {
  skus: Sku[]
  count: number
  totalPages: number
}

export class SearchSkusUseCase {
  constructor(private skusRepository: SkusRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchSkusUseCaseRequest): Promise<SearchSkusUseCaseResponse> {
    const skus = await this.skusRepository.searchMany(query, page, perPage)
    const count = await this.skusRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      skus, count, totalPages
    }
  }
}
