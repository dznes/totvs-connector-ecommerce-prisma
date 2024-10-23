import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { SearchProductsByClassificationSlugUseCase } from '@/use-cases/products/search-products-by-classification-slug'

export function makeSearchProductsByClassificationSlugUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const productRepository = new PrismaProductsRepository()
  const listClassificationsUseCase =
    new SearchProductsByClassificationSlugUseCase(
      classificationRepository,
      productRepository,
    )

  return listClassificationsUseCase
}
