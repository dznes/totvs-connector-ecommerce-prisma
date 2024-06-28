import { prisma } from '@/lib/prisma'
import { Phone, Prisma } from '@prisma/client'

import { PhonesRepository } from '../phones-repository'

export class PrismaPhonesRepository implements PhonesRepository {
  async findById(id: string) {
    const phone = await prisma.phone.findUnique({
      where: {
        id,
      },
    })
    return phone
  }

  async create(data: Prisma.PhoneUncheckedCreateInput) {
    const phone = await prisma.phone.create({
      data,
    })
    return phone
  }

  async list() {
    const phone = await prisma.phone.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return phone
  }

  async listByUserId(userId: string) {
    const phone = await prisma.phone.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return phone
  }

  async listByUserCode(userCode: string) {
    const phone = await prisma.phone.findMany({
      where: {
        user_code: userCode,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return phone
  }

  async update(phone: Phone) {
    await prisma.phone.update({
      where: { id: phone.id },
      data: phone,
    })
  }

  async delete(phone: Phone) {
    await prisma.phone.delete({
      where: {
        id: phone.id,
      },
    })
  }
}
