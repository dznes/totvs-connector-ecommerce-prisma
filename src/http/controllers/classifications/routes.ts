import { FastifyInstance } from 'fastify'

import { create } from './create-classification'
import { addClassificationProducts } from './add-classification-products'
import { listClassifications } from './list-classifications'
import { deleteClassification } from './delete-classification'
import { search } from './search-classifications'
import { getBySlug } from './get-classification-by-slug'
import { upsertTotvsClassifications } from './totvs-classification-backup'
import { linkProductsByClassificationTypeCode } from './link-products-by-classification-type-code'

export async function ClassificationsRoutes(app: FastifyInstance) {
  app.post('/api/classifications/totvs/backup', upsertTotvsClassifications)

  app.post('/api/classifications', create)
  app.get('/api/classifications/:slug', getBySlug)
  app.post('/api/classifications/add-products/:id', addClassificationProducts)
  app.post(
    '/api/classifications/totvs/link-products-by-type-code',
    linkProductsByClassificationTypeCode,
  )
  app.get('/api/classifications/all', listClassifications)
  app.get('/api/classifications/search', search)
  app.delete('/api/classifications/:id', deleteClassification)
}
