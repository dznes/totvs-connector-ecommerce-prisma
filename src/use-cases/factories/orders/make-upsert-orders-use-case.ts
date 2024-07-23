import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaOrderInvoicesRepository } from '@/repositories/prisma/prisma-order-invoices-repository'
import { PrismaShippingAddressesRepository } from '@/repositories/prisma/prisma-shipping-addresses-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpsertOrdersUseCase } from '@/use-cases/orders/upsert-orders'


export function makeUpsertOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const shippingAddressesRepository = new PrismaShippingAddressesRepository()
  const orderInvoicesRepository = new PrismaOrderInvoicesRepository()
  const userRepository = new PrismaUsersRepository()
  const upsertOrdersUseCase = new UpsertOrdersUseCase(ordersRepository, userRepository, shippingAddressesRepository, orderInvoicesRepository)

  return upsertOrdersUseCase
}