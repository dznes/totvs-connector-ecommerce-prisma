import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { AddClassificationBySkuCodesProductsUseCase } from '@/use-cases/classifications/add-classification-products-by-sku-codes'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

export function makeAddClassificationProductsBySkuCodesUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const productRepository = new PrismaProductsRepository()
  const addClassificationProductsBySkuCodesUseCase = new AddClassificationBySkuCodesProductsUseCase(
    classificationRepository,
    productRepository,
  )

  return addClassificationProductsBySkuCodesUseCase
}