import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { ListOrdersUseCase } from '../../orders/list-orders'

export function makeListOrdersUseCase() {
  const categoryRepository = new PrismaOrdersRepository()
  const listOrdersUseCase = new ListOrdersUseCase(categoryRepository)

  return listOrdersUseCase
}
