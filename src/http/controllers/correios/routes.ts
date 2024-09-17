import { FastifyInstance } from 'fastify'
import { findAddressByCEP } from './find-address-by-cep'


export async function CorreiosRoutes(app: FastifyInstance) {
  app.post('/api/correios/cep', findAddressByCEP)
}
