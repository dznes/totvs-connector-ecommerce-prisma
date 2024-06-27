import { FastifyInstance } from 'fastify'
import { skuDetailsBackup } from './sku-details-backup'
import { listSkus } from './list-skus'
import { search } from './search-sku'
import { skuPricesBackup } from './sku-prices-backup'
import { totvsListSkuBalances } from './totvs-list-sku-balances'
import { skuCostsBackup } from './sku-costs-backup'

export async function SkuRoutes(app: FastifyInstance) {
  app.get('/sku/detail/backup', skuDetailsBackup)
  app.get('/sku/price/backup', skuPricesBackup)
  app.get('/sku/cost/backup', skuCostsBackup)
  app.get('/sku', listSkus)
  app.get('/sku/search', search)

  app.get('/totvs/sku/balance', totvsListSkuBalances)
}
