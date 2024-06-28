import { prisma } from '@/lib/prisma'
import { Prisma, Sku } from '@prisma/client'

import { SkusRepository } from '../skus-repository'

export class PrismaSkusRepository implements SkusRepository {
  async findById(id: number) {
    const sku = await prisma.sku.findUnique({
      where: {
        id,
      },
      include: {
        color: true,
        size: true,
      },
    })
    return sku
  }

  async findByCode(code: string) {
    const sku = await prisma.sku.findUnique({
      where: {
        code,
      },
    })
    return sku
  }

  async findByTitle(title: string) {
    const skus = await prisma.sku.findMany({
      where: {
        title,
      },
    })
    return skus
  }

  async findBySlug(slug: string) {
    const sku = await prisma.sku.findUnique({
      where: {
        slug,
      },
      include: {
        color: true,
        size: true,
      },
    })
    return sku
  }

  async searchMany(query: string, page: number) {
    const skus = await prisma.sku.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            slug: {
              contains: query,
            },
          },
          {
            reference_id: {
              contains: query,
            },
          },
        ],
      },
      include: {
        color: true,
        size: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return skus
  }

  async count(query: string) {
    const sku = await prisma.sku.count({
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
    return sku
  }

  async create(data: Prisma.SkuCreateInput) {
    const sku = await prisma.sku.create({
      data,
    })
    return sku
  }

  async list() {
    const sku = await prisma.sku.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        color: true,
        size: true,
      },
    })
    return sku
  }

  async update(sku: Sku) {
    await prisma.sku.update({
      where: { id: sku.id },
      data: sku,
    })
  }

  async delete(sku: Sku) {
    await prisma.sku.delete({
      where: {
        id: sku.id,
      },
    })
  }
}
