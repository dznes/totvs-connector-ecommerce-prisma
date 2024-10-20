import { AddressInfoByCEP } from '@/http/lib/correios'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function findAddressByCEP(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    cep: z.string()
  })
  const { cep } =
  bodySchema.parse(request.body)
  try {

    const address = await AddressInfoByCEP(cep)
    return reply.status(201).send(address)
  } catch (err) {
    if (err) {
      return reply.status(409).send(JSON.stringify(err))
    }
    throw err
  }
}