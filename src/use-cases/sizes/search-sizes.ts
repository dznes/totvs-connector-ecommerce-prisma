import { SizesRepository } from '@/repositories/sizes-repository'
import { Size } from '@prisma/client'

interface SearchSizesUseCaseRequest {
  query: string
  page: number
  perPage: number
}

export interface SearchSizesUseCaseResponse {
  sizes: Size[]
  count: number
  totalPages: number
}

export class SearchSizesUseCase {
  constructor(private sizesRepository: SizesRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchSizesUseCaseRequest): Promise<SearchSizesUseCaseResponse> {
    const sizes = await this.sizesRepository.searchMany(query, page, perPage)
    const count = await this.sizesRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      sizes,
      count,
      totalPages,
    }
  }
}
