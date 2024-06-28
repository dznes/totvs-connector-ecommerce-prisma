import { prisma } from '@/lib/prisma'
import { Prisma, Size } from '@prisma/client'

import { SizesRepository } from '../sizes-repository'

export class PrismaSizesRepository implements SizesRepository {
  async findById(id: number) {
    const size = await prisma.size.findUnique({
      where: {
        id,
      },
    })
    return size
  }

  async findByCode(code: string) {
    const size = await prisma.size.findUnique({
      where: {
        code,
      },
    })
    return size
  }

  async findByTitle(title: string) {
    const size = await prisma.size.findMany({
      where: {
        title,
      },
    })
    return size
  }

  async create(data: Prisma.SizeUncheckedCreateInput) {
    const size = await prisma.size.create({
      data,
    })
    return size
  }

  async list() {
    const size = await prisma.size.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return size
  }

  async searchMany(query: string, page: number, perPage: number) {
    const size = await prisma.size.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
        ],
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })
    return size
  }

  async count(query: string) {
    const size = await prisma.size.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
        ],
      },
    })
    return size
  }

  async update(size: Size) {
    await prisma.size.update({
      where: { id: size.id },
      data: size,
    })
  }

  async delete(size: Size) {
    await prisma.size.delete({
      where: {
        id: size.id,
      },
    })
  }
}
