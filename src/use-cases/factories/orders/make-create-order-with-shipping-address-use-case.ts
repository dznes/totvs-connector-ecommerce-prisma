import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateOrderWithShippingAddressUseCase } from '@/use-cases/orders/create-order-with-shipping-address'

export function makeCreateOrderWithShippingAddressUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const usersRepository = new PrismaUsersRepository()
  const createOrderWithShippingAddressUseCase = new CreateOrderWithShippingAddressUseCase(ordersRepository, usersRepository)

  return createOrderWithShippingAddressUseCase
}
