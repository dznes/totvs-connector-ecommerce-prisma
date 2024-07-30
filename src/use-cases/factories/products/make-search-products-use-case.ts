import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { SearchProductsUseCase } from '@/use-cases/products/search-products'

export function makeSearchProductsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const useCase = new SearchProductsUseCase(productsRepository)

  return useCase
}
