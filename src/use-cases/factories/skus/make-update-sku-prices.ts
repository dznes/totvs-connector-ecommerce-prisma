import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { UpdateSkuPricesUseCase } from '@/use-cases/skus/update-sku-prices'


export function makeUpdateSkuPricesUseCase() {
  const skuRepository = new PrismaSkusRepository()
  const updateSkuPricesUseCase = new UpdateSkuPricesUseCase(skuRepository)

  return updateSkuPricesUseCase
}
