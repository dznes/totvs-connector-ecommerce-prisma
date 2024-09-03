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

  async findByOrderCodeProductCode(orderCode: string, productCode: string) {
    const orderItem = await prisma.orderItem.findFirst({
      where: {
        order_code: orderCode,
        product_code: productCode,
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
      include: {
        order: {
          include: {
            user: true,
          },
        },
      },
    })
    return orders
  }

  async searchMany(
    query: string,
    totvsStatus: string,
    operationCode: string,
    page: number,
    perPage: number,
  ) {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        order: {
          AND: [
            {
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
            {
              operation_code: {
                contains: operationCode,
              },
            },
            {
              totvs_order_status: {
                contains: totvsStatus,
              },
            },
          ],
        },
      },
      include: {
        order: {
          include: {
            user: {
              include: {
                phones: true,
              },
            },
            shipping_address: true,
          },
        },
      },
      orderBy: {
        totvs_created_at: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })
    return orderItems
  }

  async count(query: string, totvsStatus: string, operationCode: string) {
    const orderItem = await prisma.orderItem.count({
      where: {
        order: {
          AND: [
            {
              OR: [
                {
                  user: {
                    email: {
                      contains: query,
                    },
                  },
                },
                {
                  id: {
                    contains: query,
                  },
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
            {
              operation_code: {
                contains: operationCode,
              },
            },
            {
              totvs_order_status: {
                contains: totvsStatus,
              },
            },
          ],
        },
      },
    })
    return orderItem
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
