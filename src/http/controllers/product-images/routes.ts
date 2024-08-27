import { FastifyInstance } from 'fastify'
import { VtexProductImagesBackup } from './vtex-product-images-backup'

export async function ProductImagesRoutes(app: FastifyInstance) {
  app.get('/vtex/products', VtexProductImagesBackup)
}
