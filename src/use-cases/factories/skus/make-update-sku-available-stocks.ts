import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { UpdateSkuAvailableStocksUseCase } from '@/use-cases/skus/update-sku-available-stocks'

export function makeUpdateSkuAvailableStocksUseCase() {
  const skuRepository = new PrismaSkusRepository()
  const updateSkuAvailableStocksUseCase = new UpdateSkuAvailableStocksUseCase(
    skuRepository,
  )

  return updateSkuAvailableStocksUseCase
}
