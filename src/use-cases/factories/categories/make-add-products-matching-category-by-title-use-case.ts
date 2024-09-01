import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { AddProductsByCategoryTitleProductsUseCase } from '@/use-cases/categories/add-products-matching-category-by-title'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

export function makeAddProductsByCategoryTitleProductsUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const productRepository = new PrismaProductsRepository()
  const useCase = new AddProductsByCategoryTitleProductsUseCase(
    categoryRepository,
    productRepository,
  )

  return useCase
}
