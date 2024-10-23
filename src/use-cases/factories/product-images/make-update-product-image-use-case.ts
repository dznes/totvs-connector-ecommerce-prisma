import { PrismaProductImagesRepository } from '@/repositories/prisma/prisma-product-images-repository'
import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { UpdateProductImageUseCase } from '@/use-cases/product-images/update-product-image'

export function makeUpdateProductImageUseCase() {
  const productImagesRepository = new PrismaProductImagesRepository()
  const skusRepository = new PrismaSkusRepository()
  const updateProductImageUseCase = new UpdateProductImageUseCase(
    productImagesRepository,
    skusRepository,
  )

  return updateProductImageUseCase
}
