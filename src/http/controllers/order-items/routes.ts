import { FastifyInstance } from 'fastify'

import { listOrdersByUserId } from './list-items-by-order-id'
import { listOrderItems } from './list-order-items'
import { search } from './search-order-items'

export async function OrderItemsRoutes(app: FastifyInstance) {
  app.get('/api/order-items/all', listOrderItems)
  app.get('/api/order-items/search', search)
  app.get('/api/order-items/users/:id', listOrdersByUserId)
}
