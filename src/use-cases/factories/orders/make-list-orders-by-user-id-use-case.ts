import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { ListOrdersByUserIdUseCase } from '../../orders/list-order-by-user-id'

export function makeGetOrderBySlugUseCase() {
  const orderRepository = new PrismaOrdersRepository()
  const getOrderBySlugUseCase = new ListOrdersByUserIdUseCase(orderRepository)

  return getOrderBySlugUseCase
}
