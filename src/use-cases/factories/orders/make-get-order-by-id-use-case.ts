import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { GetOrderByIdUseCase } from '@/use-cases/orders/get-order-by-id'

export function makeGetOrderByIdUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const getOrderByIdUseCase = new GetOrderByIdUseCase(ordersRepository)

  return getOrderByIdUseCase
}
