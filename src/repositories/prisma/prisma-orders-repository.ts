import { prisma } from '@/lib/prisma'
import { Prisma, Order } from '@prisma/client'

import { OrdersRepository } from '../orders-repository'
import { Decimal } from '@prisma/client/runtime/library'

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

  async searchMany(
    query: string,
    totvsStatus: string,
    operationCode: string,
    page: number,
    perPage: number,
  ) {
    const orders = await prisma.order.findMany({
      where: {
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
      include: {
        order_items: true,
        user: {
          include: {
            phones: true,
          },
        },
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

  async count(query: string, totvsStatus: string, operationCode: string) {
    const order = await prisma.order.count({
      where: {
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

  // Dashboard queries

  async getSalesByDayAndOperationCode(startDate: Date, endDate: Date) {
    const orders = await prisma.order.groupBy({
      by: ['operation_code', 'totvs_creation_date'],
      where: {
        totvs_creation_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        total_value: true,
      },
      orderBy: {
        totvs_creation_date: 'asc',
      },
    });

    interface SalesByDate {
      date: string;
      [operationCode: string]: number | string;
    }
  
    // Get a unique list of all operation codes that exist in the period
    const operationCodes = [...new Set(orders.map(order => order.operation_code))];

    // Format the result into the desired structure
    const formattedOrders = orders.reduce<Record<string, SalesByDate>>((acc, order) => {
      if (order.totvs_creation_date) { // Ensure totvs_creation_date is not null
        const date = order.totvs_creation_date.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'

        // Initialize the date object if it doesn't exist
        if (!acc[date]) {
          acc[date] = { date };
          
          // Initialize all operation codes with 0 for the date
          operationCodes.forEach(code => {
            if (code) acc[date][code] = 0;
          });
        }

        // Ensure operation_code is not null, then add the sales value
        if (order.operation_code) {
          const totalValue = (order._sum.total_value as Decimal).toNumber(); // Convert Decimal to number
          acc[date][order.operation_code] = totalValue;
        }
      }

      return acc;
    }, {});

    // Convert the object into an array of objects
    return Object.values(formattedOrders);
  }
}
