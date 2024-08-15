import { FastifyInstance } from 'fastify'
import { ListOrders } from './totvs-list-orders'
import { OrdersBackup } from './orders-backup'
import { listOrders } from './list-orders'
import { listByUserId } from './list-orders-by-user-id'
import { search } from './search-orders'
import { getOrderDetailsById } from './get-order-details-by-id'

export async function OrderRoutes(app: FastifyInstance) {
  app.get('/totvs/orders', ListOrders)
  app.get('/order/backup', OrdersBackup)


  app.get('/api/orders/all', listOrders)
  app.get('/api/orders/users/:id', listByUserId)
  app.get('/api/orders/search', search)
  app.get('/api/orders/details/:id', getOrderDetailsById)
}
