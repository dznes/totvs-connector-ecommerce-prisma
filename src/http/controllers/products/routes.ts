import { FastifyInstance } from 'fastify'
import { getBySlug } from './get-product-by-slug'
import { listRecentProducts } from './list-recent-products'
import { search } from './search-products'
import { getById } from './get-product-by-id'
import { productBackupBySkus } from './product-backup-by-skus'

export async function ProductRoutes(app: FastifyInstance) {
  app.get('/api/products/:productSlug', getBySlug)
  app.get('/api/products/all', listRecentProducts)
  app.get('/api/products/search', search)
  app.get('/api/products/id/:id', getById)

  app.get('/products/backup', productBackupBySkus)
}
