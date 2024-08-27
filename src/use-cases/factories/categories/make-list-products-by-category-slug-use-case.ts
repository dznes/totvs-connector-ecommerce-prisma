import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { ListProductsByCategorySlug } from '@/use-cases/categories/list-products-by-category-slug'

export function makeListProductsByCategorySlugUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const listCategoriesUseCase = new ListProductsByCategorySlug(
    categoryRepository,
  )

  return listCategoriesUseCase
}
