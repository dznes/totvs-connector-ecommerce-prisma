import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListCategoriesUseCaseResponse {
  category: Category[]
}

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<ListCategoriesUseCaseResponse> {
    const category = await this.categoriesRepository.list()

    if (!category) {
      throw new ResourceNotFoundError()
    }

    return { category }
  }
}
