import { Prisma, Order } from '@prisma/client'

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  findByCode(code: string): Promise<Order | null>
  getDetailsById(id: string): Promise<Order | null> // FIX ME
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  list(): Promise<Order[] | null>
  listByUserId(userId: string): Promise<Order[] | null>
  searchMany(query: string, page: number, perPage: number, operationCode: string): Promise<Order[]>
  count(query: string): Promise<number>
  update(order: Order): Promise<void>
  delete(order: Order): Promise<void>
}
