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
    const sku = await prisma.sku.findMany({
      where: {
        title,
      },
    })
    return sku
  }

  async findBySlug(slug: string) {
    const sku = await prisma.sku.findUnique({
      where: {
        slug,
      },
      include: {
        product_images: true,
        color: true,
        size: true,
      },
    })
    return sku
  }

  async searchMany(query: string, page: number) {
    const sku = await prisma.sku.findMany({
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
    return sku
  }

  async searchMaterials(query: string, page: number) {
    const sku = await prisma.sku.findMany({
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
          {
            is_finished_product: false,
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
    return sku
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

  async listByProductCode(productCode: string) {
    const skus = await prisma.sku.findMany({
      where: { reference_id: productCode },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        color: true,
        size: true,
        product_images: true,
      },
    })
    return skus
  }

  async listByProductId(productId: number) {
    const skus = await prisma.sku.findMany({
      where: { product_id: productId },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        color: true,
        size: true,
        product_images: true,
      },
    })
    return skus
  }

  async listProductIdWithAvailableStockAndImage(
    query: string,
    productCode: string,
    integrationCode: string,
  ) {
    const skuAggregations = await prisma.sku.groupBy({
      by: ['product_id'],
      _sum: {
        stock_available: true,
      },
      where: {
        AND: [
          {
            product: {
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
                {
                  code: {
                    contains: productCode,
                  },
                },
                {
                  integration_code: {
                    contains: integrationCode,
                  },
                },
              ],
            },
          },
          {
            stock_available: {
              gt: 0, // Ensure stock_available is greater than 0
            },
          },
        ],
      },
    })
    // Filter out null or undefined productIds and ensure stock_available is greater than 0
    const productIds = skuAggregations
      .filter(
        (agg) =>
          agg._sum.stock_available !== null && agg._sum.stock_available > 0,
      )
      .map((agg) => agg.product_id)
      .filter((id): id is number => id !== null) // Filter out null values

    // If no products matched the criteria, return an empty array
    if (productIds.length === 0) {
      return []
    }

    return productIds
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
