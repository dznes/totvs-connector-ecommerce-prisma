import { Prisma, Order } from '@prisma/client'

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  findByCode(code: string): Promise<Order | null>
  getDetailsById(id: string): Promise<Order | null> // FIX ME
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  list(): Promise<Order[] | null>
  listByUserId(userId: string): Promise<Order[] | null>
  searchMany(query: string, totvsStatus: string, operationCode: string, page: number, perPage: number): Promise<Order[]>
  count(query: string, totvsStatus: string, operationCode: string): Promise<number>
  update(order: Order): Promise<void>
  delete(order: Order): Promise<void>
}
