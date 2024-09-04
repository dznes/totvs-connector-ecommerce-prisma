import { FastifyInstance } from 'fastify'
import { listColorsTOTVS } from './list-colors-totvs'
import { ColorsBackup } from './colors-backup'
import { search } from './search-colors'
import { update } from './update-color'

export async function ColorRoutes(app: FastifyInstance) {
  app.get('/totvs/colors', listColorsTOTVS)
  app.get('/color/backup', ColorsBackup)
  app.post('/api/color/update', update)

  app.get('/api/colors/search', search)
}
