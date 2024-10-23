import { PrismaProductImagesRepository } from '@/repositories/prisma/prisma-product-images-repository'
import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { CreateProductImageUseCase } from '@/use-cases/product-images/create-product-image'

export function makeCreateProductImageUseCase() {
  const productImagesRepository = new PrismaProductImagesRepository()
  const skusRepository = new PrismaSkusRepository()
  const createProductImageUseCase = new CreateProductImageUseCase(
    productImagesRepository,
    skusRepository,
  )

  return createProductImageUseCase
}
