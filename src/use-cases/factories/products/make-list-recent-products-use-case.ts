import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { ListRecentProductsUseCase } from '@/use-cases/products/list-recent-products'

export function makeListRecentProductsUseCase() {
  const productRepository = new PrismaProductsRepository()
  const listRecentProductsUseCase = new ListRecentProductsUseCase(
    productRepository,
  )

  return listRecentProductsUseCase
}
