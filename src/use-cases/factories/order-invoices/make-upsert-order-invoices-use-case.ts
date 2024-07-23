import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaOrderInvoicesRepository } from '@/repositories/prisma/prisma-order-invoices-repository'
import { UpsertOrderInvoicesUseCase } from '@/use-cases/order-invoices/upsert-order-invoices'

export function makeUpsertOrderInvoicesUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const orderInvoicesRepository = new PrismaOrderInvoicesRepository()
  const upsertOrderInvoicesUseCase = new UpsertOrderInvoicesUseCase(
    ordersRepository,
    orderInvoicesRepository,
  )

  return upsertOrderInvoicesUseCase
}
