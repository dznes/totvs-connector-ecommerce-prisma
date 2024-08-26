import { PrismaOrderItemsRepository } from '@/repositories/prisma/prisma-order-items-repository'
import { SearchOrderItemsUseCase } from '@/use-cases/order-items/search-order-items'

export function makeSearchOrderItemsUseCase() {
  const orderItemsRepository = new PrismaOrderItemsRepository()
  const useCase = new SearchOrderItemsUseCase(orderItemsRepository)

  return useCase
}
