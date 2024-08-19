import { PrismaOrderItemsRepository } from '@/repositories/prisma/prisma-order-items-repository'
import { ListItemsByOrderIdUseCase } from '@/use-cases/order-items/list-items-by-order-id'

export function makeListItemsByOrderIdUseCase() {
  const orderItemsRepository = new PrismaOrderItemsRepository()
  const listItemsByOrderIdUseCase = new ListItemsByOrderIdUseCase(
    orderItemsRepository,
  )

  return listItemsByOrderIdUseCase
}
