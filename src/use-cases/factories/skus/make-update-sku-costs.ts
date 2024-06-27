import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { UpdateSkuCostsUseCase } from '@/use-cases/skus/update-sku-costs'

export function makeUpdateSkuCostsUseCase() {
  const skuRepository = new PrismaSkusRepository()
  const updateSkuCostsUseCase = new UpdateSkuCostsUseCase(skuRepository)

  return updateSkuCostsUseCase
}
