import { FastifyInstance } from 'fastify'
import { ListOrders } from './totvs-list-orders'
import { OrdersBackup } from './orders-backup'

export async function OrderRoutes(app: FastifyInstance) {
  app.get('/totvs/orders', ListOrders)
  app.get('/order/backup', OrdersBackup)
}
