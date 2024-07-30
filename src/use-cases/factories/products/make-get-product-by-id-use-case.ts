import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { GetProductByIdUseCase } from '@/use-cases/products/get-product-by-id'

export function makeGetProductByIdUseCase() {
  const productRepository = new PrismaProductsRepository()
  const getProductByIdUseCase = new GetProductByIdUseCase(productRepository)

  return getProductByIdUseCase
}
