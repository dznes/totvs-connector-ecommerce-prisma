import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { UpdateCategoryUseCase } from '@/use-cases/categories/update-category'

export function makeUpdateCategoryUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)

  return updateCategoryUseCase
}
