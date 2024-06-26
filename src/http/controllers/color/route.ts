import { FastifyInstance } from 'fastify'
import { listColorsTOTVS } from './list-colors-totvs'
import { ColorsJsonBackup } from './colors-json-backup'



export async function ColorRoutes(app: FastifyInstance) {
  app.get('/colors/totvs', listColorsTOTVS)
  app.get('/colors/backup', ColorsJsonBackup)
}
