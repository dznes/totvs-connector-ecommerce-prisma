import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { AddClassificationProductsUseCase } from '@/use-cases/classifications/add-classification-products'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

export function makeAddClassificationProductsUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const productRepository = new PrismaProductsRepository()
  const addClassificationProductsUseCase = new AddClassificationProductsUseCase(
    classificationRepository,
    productRepository,
  )

  return addClassificationProductsUseCase
}
