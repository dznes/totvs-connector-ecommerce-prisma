import { prisma } from '@/lib/prisma'
import { Telephone, Prisma } from '@prisma/client'

import { TelephonesRepository } from '../telephones-repository'

export class PrismaTelephonesRepository implements TelephonesRepository {
  async findById(id: string) {
    const telephone = await prisma.telephone.findUnique({
      where: {
        id,
      },
    })
    return telephone
  }

  async create(data: Prisma.TelephoneUncheckedCreateInput) {
    const telephone = await prisma.telephone.create({
      data,
    })
    return telephone
  }

  async list() {
    const telephone = await prisma.telephone.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return telephone
  }

  async listByUserId(userId: string) {
    const telephone = await prisma.telephone.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return telephone
  }

  async listByUserCode(userCode: string) {
    const telephone = await prisma.telephone.findMany({
      where: {
        user_code: userCode,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return telephone
  }

  async update(telephone: Telephone) {
    await prisma.telephone.update({
      where: { id: telephone.id },
      data: telephone,
    })
  }

  async delete(telephone: Telephone) {
    await prisma.telephone.delete({
      where: {
        id: telephone.id,
      },
    })
  }
}
