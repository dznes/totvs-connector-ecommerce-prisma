import { FastifyInstance } from 'fastify'
import { findAddressByCEP } from './find-address-by-cep'
import { calculateDeliveryPriceAndDate } from './calculate-delivery-price-and-date'

export async function CorreiosRoutes(app: FastifyInstance) {
  app.post('/api/correios/cep', findAddressByCEP)
  app.post('/api/correios/price-and-date', calculateDeliveryPriceAndDate)
}
