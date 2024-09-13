import { FastifyInstance } from 'fastify'
import { getSalesByDay } from './get-sales-by-day'

export async function DashboardRoutes(app: FastifyInstance) {
  app.get('/api/dashboard/sales-by-day', getSalesByDay)
}
