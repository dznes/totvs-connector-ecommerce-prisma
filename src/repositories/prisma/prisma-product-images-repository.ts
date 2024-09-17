import { prisma } from '@/lib/prisma'
import { ProductImage, Prisma } from '@prisma/client'

import { ProductImagesRepository } from '../product-images-repository'

export class PrismaProductImagesRepository implements ProductImagesRepository {
  async findById(id: number) {
    const productImage = await prisma.productImage.findUnique({
      where: {
        id,
      },
    })
    return productImage
  }

  async findByCode(code: string) {
    const productImage = await prisma.productImage.findUnique({
      where: {
        code,
      },
    })
    return productImage
  }

  async findByTitle(title: string) {
    const productImages = await prisma.productImage.findMany({
      where: {
        title,
      },
    })
    return productImages
  }

  async create(data: Prisma.ProductImageUncheckedCreateInput) {
    const productImage = await prisma.productImage.create({
      data,
    })
    return productImage
  }

  async list() {
    const productImage = await prisma.productImage.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return productImage
  }

  async searchMany(query: string, page: number, perPage: number) {
    const productImages = await prisma.productImage.findMany({
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
    return productImages
  }

  async count(query: string) {
    const productImage = await prisma.productImage.count({
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
    return productImage
  }

  async update(productImage: ProductImage) {
    await prisma.productImage.update({
      where: { code: productImage.code },
      data: productImage,
    })
  }

  async delete(productImage: ProductImage) {
    await prisma.productImage.delete({
      where: {
        id: productImage.id,
      },
    })
  }
}
