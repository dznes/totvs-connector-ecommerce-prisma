import { PrismaColorsRepository } from '@/repositories/prisma/prisma-colors-repository'
import { PrismaOrderItemsRepository } from '@/repositories/prisma/prisma-order-items-repository'
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { CreateOrderItemUseCase } from '@/use-cases/order-items/create-order-item'

export function makeCreateOrderItemUseCase() {
  const orderItemsRepository = new PrismaOrderItemsRepository()
  const ordersRepository = new PrismaOrdersRepository()
  const skusRepository = new PrismaSkusRepository()
  const colorsRepository = new PrismaColorsRepository()
  const createOrderItemUseCase = new CreateOrderItemUseCase(
    ordersRepository,
    orderItemsRepository,
    skusRepository,
    colorsRepository,
  )

  return createOrderItemUseCase
}
