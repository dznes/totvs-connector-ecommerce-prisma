import { FastifyInstance } from 'fastify'

import { create } from './create-address'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { listAddressesByUserId } from './list-addresses-by-user-id'
import { listAddresses } from './list-addresses'
import { checkoutCreate } from './create-address-user-cookie'

export async function AddressesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/api/addresses/', create)
  app.post('/api/checkout/address', { onRequest: [verifyJwt] }, checkoutCreate)
  app.get('/api/addresses/all', listAddresses)
  app.get('/api/addresses/:id', listAddressesByUserId)
  app.delete('/api/addresses/:id', listAddressesByUserId)
}
