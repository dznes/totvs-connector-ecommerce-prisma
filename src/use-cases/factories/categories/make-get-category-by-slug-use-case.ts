import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { GetCategoryBySlugUseCase } from '@/use-cases/categories/get-category-by-slug'

export function makeGetCategoryBySlugUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const getCategoryBySlugUseCase = new GetCategoryBySlugUseCase(
    categoryRepository,
  )

  return getCategoryBySlugUseCase
}
