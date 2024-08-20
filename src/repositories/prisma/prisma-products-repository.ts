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
            product_images: true,
            color: true,
            size: true,
          },
        },
      },
    })
    return product
  }

  async findByTitle(title: string) {
    const product = await prisma.product.findFirst({
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
          // where: {
          //   stock_available: {
          //     gt: 0, // Filters SKUs with available_stock greater than 0
          //   },
          // },
          include: {
            product_images: {
              orderBy: {
                position: 'asc', // Sorts the images in ascending order by position
              },
            },
            color: true,
            size: true,
          },
        },
      },
    })
    return product
  }

  // async searchMany(query: string, page: number, perPage: number) {
  //   const products = await prisma.product.findMany({
  //     where: {
  //       OR: [
  //         {
  //           title: {
  //             contains: query,
  //           },
  //         },
  //         {
  //           slug: {
  //             contains: query,
  //           },
  //         },
  //         {
  //           reference_id: {
  //             contains: query,
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       skus: {
  //         include: {
  //           color: true,
  //           size: true,
  //           product_images: true,
  //         },
  //       },
  //     },
  //     take: perPage,
  //     skip: (page - 1) * perPage,
  //   })
  //   return products
  // }
  async searchMany(query: string, productCode: string, page: number, perPage: number) {
    // Step 1: Fetch the product IDs with stock_available > 0 and matching productCode using aggregation
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
    });
  
    // Filter out null or undefined productIds and ensure stock_available is greater than 0
    const productIds = skuAggregations
      .filter((agg) => agg._sum.stock_available !== null && agg._sum.stock_available > 0)
      .map((agg) => agg.product_id)
      .filter((id): id is number => id !== null); // Filter out null values
  
    // If no products matched the criteria, return an empty array
    if (productIds.length === 0) {
      return [];
    }
  
    // Step 2: Fetch the full product data using the filtered product IDs
    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
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
          {
            code: {
              contains: productCode,
            },
          },
        ],
      },
      include: {
        skus: {
          where: {
            is_active: true,
          },
          include: {
            color: true,
            size: true,
            product_images: true,
          },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });
  
    return products;
  }
  

  async listRecentProducts() {
    const product = await prisma.product.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return product
  }

  async count(query: string, productCode: string) {
    const product = await prisma.product.count({
      where: {
        AND: [
          {
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
          {
            code: {
              contains: productCode,
            },
          },
        ],
      },
    });
    return product;
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
