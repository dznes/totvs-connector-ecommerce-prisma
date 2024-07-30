import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { GetSkuBySlugUseCase } from '@/use-cases/skus/get-sku-by-slug'

export function makeGetSkuBySlugUseCase() {
  const skuRepository = new PrismaSkusRepository()
  const getSkuBySlugUseCase = new GetSkuBySlugUseCase(skuRepository)

  return getSkuBySlugUseCase
}
