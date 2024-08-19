import { PrismaOrderItemsRepository } from '@/repositories/prisma/prisma-order-items-repository'
import { ListOrderItemsUseCase } from '@/use-cases/order-items/list-order-items'

export function makeListOrderItemsUseCase() {
  const categoryRepository = new PrismaOrderItemsRepository()
  const listOrderItemsUseCase = new ListOrderItemsUseCase(categoryRepository)

  return listOrderItemsUseCase
}
