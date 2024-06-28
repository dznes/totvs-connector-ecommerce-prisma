import { prisma } from '@/lib/prisma'
import { Address, Prisma } from '@prisma/client'

import { AddressesRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async findById(id: string) {
    const address = await prisma.address.findUnique({
      where: {
        id,
      },
    })
    return address
  }

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await prisma.address.create({
      data,
    })
    return address
  }

  async list() {
    const addresses = await prisma.address.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return addresses
  }

  async listByUserId(userId: string) {
    const address = await prisma.address.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return address
  }

  async listByUserCode(userCode: string) {
    const address = await prisma.address.findMany({
      where: {
        user_code: userCode,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return address
  }

  async update(address: Address) {
    await prisma.address.update({
      where: { id: address.id },
      data: address,
    })
  }

  async delete(address: Address) {
    await prisma.address.delete({
      where: {
        id: address.id,
      },
    })
  }
}
