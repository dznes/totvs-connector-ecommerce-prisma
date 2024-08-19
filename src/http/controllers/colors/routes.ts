import { FastifyInstance } from 'fastify'
import { listColorsTOTVS } from './list-colors-totvs'
import { ColorsBackup } from './colors-backup'
import { search } from './search-colors'

export async function ColorRoutes(app: FastifyInstance) {
  app.get('/totvs/colors', listColorsTOTVS)
  app.get('/color/backup', ColorsBackup)

  app.get('/api/colors/search', search)
}
