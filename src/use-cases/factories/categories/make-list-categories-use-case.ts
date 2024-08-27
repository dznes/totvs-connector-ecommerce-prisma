import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { ListCategoriesUseCase } from '@/use-cases/categories/list-categories'

export function makeListCategoriesUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository)

  return listCategoriesUseCase
}
