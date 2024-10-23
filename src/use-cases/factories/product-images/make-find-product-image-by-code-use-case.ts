import { PrismaProductImagesRepository } from '@/repositories/prisma/prisma-product-images-repository'
import { FindProductImageByCodeUseCase } from '@/use-cases/product-images/find-product-image-by-code'

export function makeFindProductImageByCode() {
  const productImagesRepository = new PrismaProductImagesRepository()
  const updateProductImageUseCase = new FindProductImageByCodeUseCase(
    productImagesRepository,
  )

  return updateProductImageUseCase
}
