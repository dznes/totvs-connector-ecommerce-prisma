import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { SearchOnlyWithImageAndStockUseCase } from '@/use-cases/products/search-products-with-image-and-stock'

export function makeSearchOnlyWithImageAndStockUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const useCase = new SearchOnlyWithImageAndStockUseCase(productsRepository)

  return useCase
}
