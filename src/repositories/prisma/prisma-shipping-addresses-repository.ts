import { prisma } from '@/lib/prisma'
import { ShippingAddress, Prisma } from '@prisma/client'

import { ShippingAddressesRepository } from '../shipping-addresses-repository'

export class PrismaShippingAddressesRepository implements ShippingAddressesRepository {
  async findById(id: string) {
    const address = await prisma.shippingAddress.findUnique({
      where: {
        id,
      },
    })
    return address
  }

  async create(data: Prisma.ShippingAddressUncheckedCreateInput) {
    const address = await prisma.shippingAddress.create({
      data,
    })
    return address
  }

  async list() {
    const addresses = await prisma.shippingAddress.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return addresses
  }

  async findByOrderId(orderCode: string) {
    const address = await prisma.shippingAddress.findUnique({
        where: {
          order_code: orderCode,
        },
      })
      return address
  }

  async findByOrderCode(orderCode: string) {
    const address = await prisma.shippingAddress.findUnique({
      where: {
        order_code: orderCode,
      },
    })
    return address
  }

  async update(shippingAddress: ShippingAddress) {
    await prisma.shippingAddress.update({
      where: { id: shippingAddress.id },
      data: shippingAddress,
    })
  }

  async updateByOrderCode(shippingAddress: ShippingAddress) {
    await prisma.shippingAddress.update({
      where: { order_code: shippingAddress.order_code },
      data: shippingAddress,
    })
  }

  async updateByOrderId(shippingAddress: ShippingAddress) {
    await prisma.shippingAddress.update({
      where: { order_id: shippingAddress.order_id },
      data: shippingAddress,
    })
  }

  async delete(shippingAddress: ShippingAddress) {
    await prisma.shippingAddress.delete({
      where: {
        id: shippingAddress.id,
      },
    })
  }
}
