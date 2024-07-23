import { prisma } from '@/lib/prisma'
import { Prisma, OrderInvoice } from '@prisma/client'

import { OrderInvoicesRepository } from '../order-invoices-repository'

export class PrismaOrderInvoicesRepository implements OrderInvoicesRepository {
  async findById(id: number) {
    const orderInvoice = await prisma.orderInvoice.findUnique({
      where: {
        id,
      },
    })
    return orderInvoice
  }

  async findByCode(code: string) {
    const orderInvoice = await prisma.orderInvoice.findUnique({
      where: {
        code,
      },
    })
    return orderInvoice
  }

  async create(data: Prisma.OrderInvoiceCreateInput) {
    const orderInvoice = await prisma.orderInvoice.create({
      data,
    })
    return orderInvoice
  }

  async list() {
    const orderInvoice = await prisma.orderInvoice.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return orderInvoice
  }

  async listByOrderId(orderId: string) {
    const orders = await prisma.orderInvoice.findMany({
      where: {
        order_id: orderId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return orders
  }

  async listByOrderCode(orderCode: string) {
    const orders = await prisma.orderInvoice.findMany({
      where: {
        order_code: orderCode,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return orders
  }

  async update(orderInvoice: OrderInvoice) {
    await prisma.orderInvoice.update({
      where: { id: orderInvoice.id },
      data: orderInvoice,
    })
  }

  async delete(orderInvoice: OrderInvoice) {
    await prisma.orderInvoice.delete({
      where: {
        id: orderInvoice.id,
      },
    })
  }
}
