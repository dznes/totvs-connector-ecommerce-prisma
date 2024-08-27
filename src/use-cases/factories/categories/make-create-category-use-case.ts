import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { CreateCategoryUseCase } from '@/use-cases/categories/create-category'

export function makeCreateCategoryUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

  return createCategoryUseCase
}
