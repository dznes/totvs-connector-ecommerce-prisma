import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { SearchProductsByCategorySlugUseCase } from '@/use-cases/products/search-products-by-category-slug'

export function makeSearchProductsByCategorySlugUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const productRepository = new PrismaProductsRepository()
  const listCategoriesUseCase = new SearchProductsByCategorySlugUseCase(
    categoryRepository,
    productRepository,
  )

  return listCategoriesUseCase
}
