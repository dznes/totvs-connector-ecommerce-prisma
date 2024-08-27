import { prisma } from '@/lib/prisma'
import { Category, Prisma } from '@prisma/client'

import { CategoriesRepository } from '../categories-repository'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findById(id: number) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })
    return category
  }

  async findByTitle(title: string) {
    const category = await prisma.category.findUnique({
      where: {
        title,
      },
    })
    return category
  }

  async findBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: {
          include: {
            skus: {
              include: {
                product_images: true,
              },
            },
          },
        },
      },
    })
    return category
  }

  async listProductsByCategorySlug(slug: string) {
    const categoryWithProducts = await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: true, // Include the products in the result
      },
    })
    return categoryWithProducts
  }

  async count(query: string) {
    const category = await prisma.category.count({
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
        ],
      },
    })
    return category
  }

  async searchMany(query: string, page: number, perPage: number) {
    const categories = await prisma.category.findMany({
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
        ],
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        created_at: 'desc',
      }
    })
    return categories
  }

  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    })
    return category
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

  async list() {
    const category = await prisma.category.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        products: true, // Include the products in the result
      },
    })
    return category
  }

  async update(category: Category) {
    await prisma.category.update({
      where: { id: category.id },
      data: category,
    })
  }

  async delete(category: Category) {
    await prisma.category.delete({
      where: {
        id: category.id,
      },
    })
  }
}
