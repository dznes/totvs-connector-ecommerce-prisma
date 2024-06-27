import { fetchToken, listColors } from '@/http/lib/totvs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listColorsTOTVS(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    page: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(500),
    q: z.record(z.string(), z.string()).optional(),
  })

  try {
    const token = await fetchToken()
    const { page, pageSize, q } = querySchema.parse(request.query)
    // const offset = (page - 1) * pageSize

    const colors = await listColors({
      token: token.access_token,
      page,
      pageSize,
    })

    return reply.status(200).send({ data: colors, page, pageSize })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
