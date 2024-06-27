import { prisma } from '@/lib/prisma'
import { Color, Prisma } from '@prisma/client'

import { ColorsRepository } from '../colors-repository'

export class PrismaColorsRepository implements ColorsRepository {
  async findById(id: number) {
    const color = await prisma.color.findUnique({
      where: {
        id,
      },
    })
    return color
  }

  async findByCode(code: string) {
    const color = await prisma.color.findUnique({
      where: {
        code,
      },
    })
    return color
  }

  async findByTitle(title: string) {
    const colors = await prisma.color.findMany({
      where: {
        title,
      },
    })
    return colors
  }

  async create(data: Prisma.ColorUncheckedCreateInput) {
    const color = await prisma.color.create({
      data,
    })
    return color
  }

  async list() {
    const color = await prisma.color.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return color
  }

  async searchMany(query: string, page: number, perPage: number) {
    const colors = await prisma.color.findMany({
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
    return colors
  }

  async count(query: string) {
    const color = await prisma.color.count({
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
    return color
  }

  async update(color: Color) {
    await prisma.color.update({
      where: { id: color.id },
      data: color,
    })
  }

  async delete(color: Color) {
    await prisma.color.delete({
      where: {
        id: color.id,
      },
    })
  }
}
