import { FastifyInstance } from 'fastify'
import { VtexProductImagesBackup } from './vtex-product-images-backup'
import { LinkProductImagesToSkuByProductAndColor } from './link-product-images-to-skus-by-color'

export async function ProductImagesRoutes(app: FastifyInstance) {
  app.get('/vtex/products', VtexProductImagesBackup)
  app.get('/product-images/link-by-product-color', LinkProductImagesToSkuByProductAndColor)
}
