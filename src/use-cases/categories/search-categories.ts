import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'

interface SearchCategoriesUseCaseRequest {
  query: string
  page: number
  perPage: number
}

export interface SearchCategoriesUseCaseResponse {
  categories: Category[]
  count: number
  totalPages: number
}

export class SearchCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchCategoriesUseCaseRequest): Promise<SearchCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.searchMany(
      query,
      page,
      perPage,
    )
    const count = await this.categoriesRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      categories,
      count,
      totalPages,
    }
  }
}
