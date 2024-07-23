import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaOrderItemsRepository } from '@/repositories/prisma/prisma-order-items-repository'
import { UpsertOrderItemsUseCase } from '@/use-cases/order-items/upsert-order-items'


export function makeUpsertOrderItemsUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const orderItemsRepository = new PrismaOrderItemsRepository()
  const upsertOrderItemsUseCase = new UpsertOrderItemsUseCase(ordersRepository, orderItemsRepository)

  return upsertOrderItemsUseCase
}