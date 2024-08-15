import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { SearchOrdersUseCase } from '@/use-cases/orders/search-orders'

export function makeSearchOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const useCase = new SearchOrdersUseCase(ordersRepository)

  return useCase
}
