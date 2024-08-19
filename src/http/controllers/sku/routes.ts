import { FastifyInstance } from 'fastify'
import { skuDetailsBackup } from './sku-details-backup'
import { listSkus } from './list-skus'
import { search } from './search-sku'
import { skuPricesBackup } from './sku-prices-backup'
import { skuCostsBackup } from './sku-costs-backup'
import { skuAvailableStocksBackup } from './sku-available-stock-backup'
import { searchMaterials } from './search-material-skus'

export async function SkuRoutes(app: FastifyInstance) {
  app.get('/sku/detail/backup', skuDetailsBackup)
  app.get('/sku/price/backup', skuPricesBackup)
  app.get('/sku/cost/backup', skuCostsBackup)
  app.get('/sku/stock/backup', skuAvailableStocksBackup)
  app.get('/sku', listSkus)
  app.get('/sku/search', search)
  app.get('/sku/search-material', searchMaterials)
}
