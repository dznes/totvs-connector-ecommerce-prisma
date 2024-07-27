import { prisma } from '@/lib/prisma'
import { Prisma, Product } from '@prisma/client'

import { ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async findById(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        skus: {
          include: {
            color: true,
            size: true,
          },
        },
      },
    })
    return product
  }

  async findByTitle(title: string) {
    const product = await prisma.product.findUnique({
      where: {
        title,
      },
    })
    return product
  }

  async findBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        skus: {
          include: {
            color: true,
            size: true,
          },
        },
      },
    })
    return product
  }

  async searchMany(query: string, page: number, perPage: number) {
    const products = await prisma.product.findMany({
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
        skus: {
          include: {
            color: true,
            size: true,
          },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })
    return products
  }

  async listRecentProducts() {
    const product = await prisma.product.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return product
  }

  async count(query: string) {
    const product = await prisma.product.count({
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
    })
    return product
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data,
    })
    return product
  }

  async updateInfo(product: Product) {
    await prisma.product.update({
      where: { id: product.id },
      data: product,
    })
  }

  async delete(product: Product) {
    await prisma.product.delete({
      where: {
        id: product.id,
      },
    })
  }

  async addProductsToCategory(categoryId: number, productIds: number[]) {
    const categoryWithUpdatedProducts = await prisma.category.update({
      where: { id: categoryId },
      data: {
        products: {
          connect: productIds.map((productId) => ({ id: productId })),
        },
      },
    })

    return categoryWithUpdatedProducts
  }
}
