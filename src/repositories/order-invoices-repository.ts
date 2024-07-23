import { Prisma, OrderInvoice } from '@prisma/client'

export interface OrderInvoicesRepository {
  findById(id: number): Promise<OrderInvoice | null>
  findByCode(code: string): Promise<OrderInvoice | null>
  create(data: Prisma.OrderInvoiceCreateInput): Promise<OrderInvoice>
  list(): Promise<OrderInvoice[] | null>
  listByOrderId(orderId: string): Promise<OrderInvoice[] | null>
  listByOrderCode(orderCode: string): Promise<OrderInvoice[] | null>
  update(orderItem: OrderInvoice): Promise<void>
  delete(orderItem: OrderInvoice): Promise<void>
}
