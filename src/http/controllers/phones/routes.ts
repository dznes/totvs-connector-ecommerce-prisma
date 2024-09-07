import { FastifyInstance } from 'fastify'

import { create } from './create-phone'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { listPhones } from './list-phones'
import { deletePhone } from './delete-phone'
import { listByUserId } from './list-phones-by-user-id'
import { checkoutCreate } from './create-phone-user-cookie'

export async function PhonesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/api/phone', create)
  app.post(
    '/api/checkout/phone',
    { onRequest: [verifyJwt] },
    checkoutCreate,
  )
  app.get('/api/phones/all', listPhones)
  app.get('/api/phones/:id', listByUserId)
  app.delete('/api/phones/:id', deletePhone)
}
