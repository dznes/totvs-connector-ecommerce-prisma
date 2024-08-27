import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { AddCategoryProductsUseCase } from '@/use-cases/categories/add-category-products'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

export function makeAddCategoryProductsUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const productRepository = new PrismaProductsRepository()
  const addCategoryProductsUseCase = new AddCategoryProductsUseCase(
    categoryRepository,
    productRepository,
  )

  return addCategoryProductsUseCase
}
