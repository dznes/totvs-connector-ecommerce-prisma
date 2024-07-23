import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpsertOrdersUseCase } from '@/use-cases/orders/upsert-orders'

export function makeUpsertOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const userRepository = new PrismaUsersRepository()
  const upsertOrdersUseCase = new UpsertOrdersUseCase(
    ordersRepository,
    userRepository,
  )

  return upsertOrdersUseCase
}
