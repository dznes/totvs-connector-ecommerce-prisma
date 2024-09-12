import { createOrderPayment } from '@/http/lib/pagarme'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function orderPayment(request: FastifyRequest, reply: FastifyReply) {
  const createOrderPaymentBodySchema = z.object({
        customer: z.object({
            name: z.string(),
            email: z.string().email(),
            document: z.string(),
            type: z.enum(['individual', 'corporate']),
            phones: z.object({
            mobile_phone: z.object({
                country_code: z.string(),
                area_code: z.string(),
                number: z.string()
            })
            })
        }),
        shipping: z.object({
            address: z.object({
            line_1: z.string(),
            zip_code: z.string(),
            city: z.string(),
            state: z.string(),
            country: z.string()
            }),
            amount: z.number(),
            description: z.string(),
            recipient_name: z.string(),
            recipient_phone: z.string()
        }),
        items: z.array(z.object({
            code: z.number(),
            amount: z.number(),
            description: z.string(),
            quantity: z.number()
        })),
        payments: z.array(z.object({
            payment_method: z.enum(['credit_card']),
            credit_card: z.object({
            recurrence: z.boolean(),
            installments: z.number(),
            statement_descriptor: z.string(),
            card_token: z.string()
            })
        }))
    });
        
  const { customer, shipping, items, payments } = createOrderPaymentBodySchema.parse(request.body);

  try {

    const response = await createOrderPayment({ customer, shipping, items, payments })
    return reply.status(201).send({ response })

  } catch (err) {

    if (err) {
      return reply.status(409).send({ message: err })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
