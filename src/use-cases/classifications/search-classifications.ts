import { ClassificationsRepository } from '@/repositories/classifications-repository'
import { Classification } from '@prisma/client'

interface SearchClassificationsUseCaseRequest {
  query: string
  page: number
  perPage: number
}

export interface SearchClassificationsUseCaseResponse {
  classifications: Classification[]
  count: number
  totalPages: number
}

export class SearchClassificationsUseCase {
  constructor(private classificationsRepository: ClassificationsRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchClassificationsUseCaseRequest): Promise<SearchClassificationsUseCaseResponse> {
    const classifications = await this.classificationsRepository.searchMany(
      query,
      page,
      perPage,
    )
    const count = await this.classificationsRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      classifications,
      count,
      totalPages,
    }
  }
}
