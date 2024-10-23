import { FastifyInstance } from 'fastify'
import { createCardCheckout } from './create-card-token'
import { orderPayment } from './create-order-payment'
import { orderComplete } from './create-complete-order'

export async function CheckoutRoutes(app: FastifyInstance) {
  app.post('/api/checkout/card-token', createCardCheckout)
  app.post('/api/checkout/order-payment', orderPayment)
  app.post('/api/checkout/order-complete', orderComplete)
}
