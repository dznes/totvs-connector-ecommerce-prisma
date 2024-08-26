import { Prisma, OrderItem } from '@prisma/client'

export interface OrderItemsRepository {
  findById(id: number): Promise<OrderItem | null>
  findByOrderCodeProductCode(
    orderCode: string,
    productCode: string,
  ): Promise<OrderItem | null>
  create(data: Prisma.OrderItemUncheckedCreateInput): Promise<OrderItem>
  list(): Promise<OrderItem[] | null>
  listByOrderId(orderId: string): Promise<OrderItem[] | null>
  listByOrderCode(orderCode: string): Promise<OrderItem[] | null>
  searchMany(query: string, totvsStatus: string, operationCode: string, page: number, perPage: number): Promise<OrderItem[]>
  count(query: string, totvsStatus: string, operationCode: string): Promise<number>
  update(orderItem: OrderItem): Promise<void>
  delete(orderItem: OrderItem): Promise<void>
}
