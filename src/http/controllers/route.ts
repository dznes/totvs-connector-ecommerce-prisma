import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { fetchToken, getOrderItems } from '../lib/totvs'

export async function AppRoutes(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = await fetchToken()
    return reply.status(200).send(JSON.stringify(token))
  })
}
