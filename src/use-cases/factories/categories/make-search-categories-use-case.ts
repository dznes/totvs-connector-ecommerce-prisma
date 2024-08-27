import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { SearchCategoriesUseCase } from '@/use-cases/categories/search-categories'

export function makeSearchCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const useCase = new SearchCategoriesUseCase(categoriesRepository)

  return useCase
}
