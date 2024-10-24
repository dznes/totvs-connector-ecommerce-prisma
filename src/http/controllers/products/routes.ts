import { FastifyInstance } from 'fastify'
import { getBySlug } from './get-product-by-slug'
import { listRecentProducts } from './list-recent-products'
import { search } from './search-products'
import { getById } from './get-product-by-id'
import { productBackupBySkus } from './product-backup-by-skus'
import { searchWithImageAndStock } from './search-products-with-image-and-stock'
import { searchProductsByCategorySlug } from './search-products-by-category-slug'
import { searchProductsByClassificationSlug } from './search-products-by-classification-slug'

export async function ProductRoutes(app: FastifyInstance) {
  app.get('/api/products/:productSlug', getBySlug)
  app.get('/api/products/all', listRecentProducts)
  app.get('/api/products/search', search)
  app.get('/api/products/search-with-image-and-stock', searchWithImageAndStock)
  app.get('/api/category/:categorySlug', searchProductsByCategorySlug)
  app.get(
    '/api/classification/:classificationSlug',
    searchProductsByClassificationSlug,
  )

  app.get('/api/products/id/:id', getById)

  app.get('/products/backup', productBackupBySkus)
}
