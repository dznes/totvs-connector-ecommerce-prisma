import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { GetProductBySlugUseCase } from '@/use-cases/products/get-product-by-slug'

export function makeGetProductBySlugUseCase() {
  const productRepository = new PrismaProductsRepository()
  const getProductBySlugUseCase = new GetProductBySlugUseCase(productRepository)

  return getProductBySlugUseCase
}
