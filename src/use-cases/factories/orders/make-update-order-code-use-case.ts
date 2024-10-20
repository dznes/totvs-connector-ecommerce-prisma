import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { UpdateOrderCodeUseCase } from '@/use-cases/orders/update-order-code'

export function makeUpdateOrderCodeUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const useCase = new UpdateOrderCodeUseCase(ordersRepository)

  return useCase
}
