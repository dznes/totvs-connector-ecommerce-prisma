import { prisma } from '@/lib/prisma'
import { Prisma, OrderItem } from '@prisma/client'

import { OrderItemsRepository } from '../order-items-repository'

export class PrismaOrderItemsRepository implements OrderItemsRepository {
  async findById(id: number) {
    const orderItem = await prisma.orderItem.findUnique({
      where: {
        id,
      },
    })
    return orderItem
  }

  async create(data: Prisma.OrderItemUncheckedCreateInput) {
    const orderItem = await prisma.orderItem.create({
      data,
    })
    return orderItem
  }

  async list() {
    const orderItem = await prisma.orderItem.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return orderItem
  }

  async listByOrderId(orderId: string) {
    const orders = await prisma.orderItem.findMany({
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
    const orders = await prisma.orderItem.findMany({
      where: {
        order_code: orderCode,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return orders
  }

  async update(orderItem: OrderItem) {
    await prisma.orderItem.update({
      where: { id: orderItem.id },
      data: orderItem,
    })
  }

  async delete(orderItem: OrderItem) {
    await prisma.orderItem.delete({
      where: {
        id: orderItem.id,
      },
    })
  }
}
