import { FastifyReply, FastifyRequest } from 'fastify'
import { productsInfo } from '@/http/lib/vtex'
import { prisma } from '@/lib/prisma'

// Helper function to extract images from products
function extractImages(products: any[]): any[] {
  return products.flatMap((product: any) =>
    product.items.flatMap((sku: any) =>
      sku.images.map((image: any, index: number) => ({
        sku_code: sku.referenceId[0]?.Value,
        code: image.imageId,
        file_key: image.imageUrl,
        title: image.imageText,
        color: sku.Cor[0],
        position: index,
      })),
    ),
  )
}

export async function VtexProductImagesBackup(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const pageSize = 50 // Number of items per page
  const images = []
  let totalResources = 0

  try {
    // Initial fetch to get totalResources
    const { products, totalResources: initialTotalResources } =
      await productsInfo(0, pageSize - 1)

    totalResources = parseInt(initialTotalResources, 10)

    // Process initial page
    images.push(...extractImages(products))

    // Calculate total pages
    const totalPages = Math.ceil(totalResources / pageSize)

    // Fetch and process remaining pages
    for (let page = 1; page < totalPages; page++) {
      const from = page * pageSize
      const to = from + pageSize - 1
      const { products } = await productsInfo(from, to)
      images.push(...extractImages(products))
    }

    // Save images to the database sequentially to reduce concurrency
    for (const image of images) {
      try {
        const productImageExists = await prisma.productImage.findUnique({
          where: {
            code: image.code,
          },
        })

        if (productImageExists) {
          await prisma.productImage.update({
            data: {
              code: image.code,
              title: image.title,
              color: image.color,
              file_key: image.file_key,
              position: image.position,
              sku: {
                connect: {
                  code: image.sku_code,
                },
              },
            },
            where: {
              code: image.code,
            },
          })
        } else {
          await prisma.productImage.create({
            data: {
              code: image.code,
              title: image.title,
              color: image.color,
              file_key: image.file_key,
              position: image.position,
              sku: {
                connect: {
                  code: image.sku_code,
                },
              },
            },
          })
        }
      } catch (error) {
        console.error(`Error processing image with code ${image.code}:`, error)
      }
    }

    reply.send({ images, totalResources })
  } catch (error) {
    console.error('Error fetching products info:', error)
    reply
      .status(500)
      .send({ error: 'An error occurred while processing the request' })
  }
}
