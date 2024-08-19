import { prisma } from '@/lib/prisma'
import { Prisma, Order } from '@prisma/client'

import { OrdersRepository } from '../orders-repository'

export class PrismaOrdersRepository implements OrdersRepository {
  async findById(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })
    return order
  }

  async findByCode(code: string) {
    const order = await prisma.order.findUnique({
      where: {
        code,
      },
    })
    return order
  }

  async getDetailsById(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        order_items: true,
        shipping_address: true,
      },
    })
    return order
  }

  async create(data: Prisma.OrderUncheckedCreateInput) {
    const order = await prisma.order.create({
      data,
    })
    return order
  }

  async list() {
    const order = await prisma.order.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return order
  }

  async listByUserId(userId: string) {
    const orders = await prisma.order.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return orders
  }

  async searchMany(query: string, page: number, perPage: number) {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          {
            user: {
              email: {
                contains: query,
              },
            },
          },
          {
            id: { contains: query },
          },
          {
            shipping_address: {
              zip_code: {
                contains: query,
              },
            },
          },
        ],
      },
      include: {
        order_items: true,
        user: true,
        shipping_address: true,
      },
      orderBy: {
        totvs_creation_date: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })
    return orders
  }

  async count(query: string) {
    const order = await prisma.order.count({
      where: {
        OR: [
          {
            user: {
              email: {
                contains: query,
              },
            },
          },
          {
            id: { contains: query },
          },
          {
            shipping_address: {
              zip_code: {
                contains: query,
              },
            },
          },
        ],
      },
    })
    return order
  }

  async update(order: Order) {
    await prisma.order.update({
      where: { id: order.id },
      data: order,
    })
  }

  async delete(order: Order) {
    await prisma.order.delete({
      where: {
        id: order.id,
      },
    })
  }
}
