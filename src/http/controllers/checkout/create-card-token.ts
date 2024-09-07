import { CreateCardToken } from '@/http/lib/pagarme'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createCardCheckout(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    type: z.string(),
    card: z.object({
        number: z.string(),
        holder_name: z.string(),
        exp_month: z.number(),
        exp_year: z.number(),
        cvv: z.string(),
    }),
  })

  const { type, card } = registerBodySchema.parse(request.body)

  try {

    const cardToken = await CreateCardToken({ type, card })
    return reply.status(201).send({ cardToken })

  } catch (err) {

    if (err) {
      return reply.status(409).send({ message: err })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
