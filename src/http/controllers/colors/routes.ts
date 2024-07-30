import { FastifyInstance } from 'fastify'
import { listColorsTOTVS } from './list-colors-totvs'
import { ColorsBackup } from './colors-backup'

export async function ColorRoutes(app: FastifyInstance) {
  app.get('/totvs/colors', listColorsTOTVS)
  app.get('/color/backup', ColorsBackup)
}
