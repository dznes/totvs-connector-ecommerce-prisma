import { prisma } from '@/lib/prisma'
import { Classification, Prisma } from '@prisma/client'

import { ClassificationsRepository } from '../classifications-repository'

export class PrismaClassificationsRepository implements ClassificationsRepository {
  async findById(id: number) {
    const classification = await prisma.classification.findUnique({
      where: {
        id,
      },
    })
    return classification
  }

  async findByCodeAndTypeCode(code: string, type_code: string) {
    const classification = await prisma.classification.findUnique({
      where: {
        code_type_code: {  // Composite key lookup
          code,
          type_code,
        },
      },
    })
    return classification
  }
  async findBySlug(slug: string) {
    const classification = await prisma.classification.findUnique({
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
    return classification
  }

  async count(query: string) {
    const classification = await prisma.classification.count({
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
    return classification
  }

  async searchMany(query: string, page: number, perPage: number) {
    const classifications = await prisma.classification.findMany({
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
      },
    })
    return classifications
  }

  async create(data: Prisma.ClassificationCreateInput) {
    const classification = await prisma.classification.create({
      data,
    })
    return classification
  }

  async addProductsToClassification(classificationId: number, productIds: number[]) {
    const classificationWithUpdatedProducts = await prisma.classification.update({
      where: { id: classificationId },
      data: {
        products: {
          connect: productIds.map((productId) => ({ id: productId })),
        },
      },
    })

    return classificationWithUpdatedProducts
  }

  async list() {
    const classification = await prisma.classification.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        products: true, // Include the products in the result
      },
    })
    return classification
  }

  async listByTypeCode(typeCode: string) {
    const classifications = await prisma.classification.findMany({
      where: {
        OR: [
          {
            type_code: {
              contains: typeCode,
            },
          },
        ],
      },
      orderBy: {
        code: 'desc',
      },
    })
    return classifications
  }

  async update(classification: Classification) {
    await prisma.classification.update({
      where: { id: classification.id },
      data: classification,
    })
  }

  async delete(classification: Classification) {
    await prisma.classification.delete({
      where: {
        id: classification.id,
      },
    })
  }
}
