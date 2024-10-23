import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'node:crypto'

export async function LinkProductImagesToSkuByProductAndColor(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Fetch all products with related SKUs and product images
    const products = await prisma.product.findMany({
      include: {
        skus: {
          include: {
            product_images: true,
          },
        },
      },
    })

    // Loop over all products
    for (const product of products) {
      // Separate SKUs with and without images
      const skusWithImages = product.skus.filter(
        (sku) => sku.product_images.length > 0,
      )
      const skusWithoutImages = product.skus.filter(
        (sku) => sku.product_images.length === 0,
      )

      // Ensure there are both SKUs with and without images
      if (skusWithImages.length > 0 && skusWithoutImages.length > 0) {
        const skuImagesMap = new Map<
          string,
          (typeof skusWithImages)[0]['product_images']
        >()

        // Map SKUs that have images, indexed by color
        for (const sku of skusWithImages) {
          skuImagesMap.set(sku.color_code, sku.product_images)
        }

        // Assign images from matching color SKUs to SKUs that don't have images
        for (const skuWithoutImages of skusWithoutImages) {
          const imagesToCopy = skuImagesMap.get(skuWithoutImages.color_code)

          if (imagesToCopy) {
            for (const image of imagesToCopy) {
              await prisma.productImage.create({
                data: {
                  title: image.title,
                  file_key: image.file_key,
                  color: image.color,
                  slug: image.slug,
                  content_type: image.content_type,
                  position: image.position,
                  code: randomUUID().toString(), // Generate a new UUID for the image
                  sku_code: skuWithoutImages.code, // Link the image to the SKU without images
                },
              })
            }
          }
        }
      }
    }

    reply.send({
      message: 'Product images have been backed up and linked successfully',
    })
  } catch (error) {
    console.error('Error fetching products info:', error)
    reply
      .status(500)
      .send({ error: 'An error occurred while processing the request' })
  }
}
