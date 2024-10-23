import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { GetSalesByDayUseCase } from '@/use-cases/dashboards/get-sales-by-day'

export function makeGetSalesByDayUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const getSalesByDayUseCase = new GetSalesByDayUseCase(ordersRepository)

  return getSalesByDayUseCase
}
