import { FastifyInstance } from 'fastify'
import { createCardCheckout } from './create-card-token'

export async function ColorRoutes(app: FastifyInstance) {
    app.post('/api/checkout', createCardCheckout)
}
