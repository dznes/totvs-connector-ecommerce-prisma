import { fetchToken, listOrders } from '@/http/lib/totvs'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ListOrders(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = await fetchToken()
    const props = {
      token: token.access_token,
      page: 2,
      pageSize: 1,
      daysFromToday: 10,
    }
    const orderItems = await listOrders(props)
    console.log(orderItems)
    return reply.status(200).send(JSON.stringify(orderItems))
  } catch (err) {
    console.log(err)
  }
}
