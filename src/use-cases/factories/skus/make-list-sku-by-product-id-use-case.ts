import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { ListSkuByProductIdUseCase } from '@/use-cases/skus/list-sku-by-product-id'

export function makeListSkuByProductIdUseCase() {
  const SkusRepository = new PrismaSkusRepository()
  const listSkuByIdProductUseCase = new ListSkuByProductIdUseCase(
    SkusRepository,
  )

  return listSkuByIdProductUseCase
}
