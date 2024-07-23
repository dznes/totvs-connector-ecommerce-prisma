import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaShippingAddressesRepository } from '@/repositories/prisma/prisma-shipping-addresses-repository'
import { UpsertShippingAddressesUseCase } from '@/use-cases/shipping-addresses/upsert-shipping-addresses'

export function makeUpsertShippingAddressesUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const shippingAddressesRepository = new PrismaShippingAddressesRepository()
  const upsertShippingAddressesUseCase = new UpsertShippingAddressesUseCase(
    ordersRepository,
    shippingAddressesRepository,
  )

  return upsertShippingAddressesUseCase
}
