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
          number: z.string(),
        }),
      }),
    }),
    shipping: z.object({
      address: z.object({
        line_1: z.string(),
        zip_code: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
      }),
      amount: z.number(),
      description: z.string(),
      recipient_name: z.string(),
      recipient_phone: z.string(),
    }),
    items: z.array(
      z.object({
        code: z.number(),
        amount: z.number(),
        description: z.string(),
        quantity: z.number(),
      })
    ),
    payments: z.array(
      z.object({
        payment_method: z.enum([
          'credit_card',
          'boleto',
          'voucher',
          'bank_transfer',
          'safety_pay',
          'checkout',
          'cash',
          'pix',
        ]),
        credit_card: z
          .object({
            recurrence: z.boolean().optional().default(false),
            installments: z.number(),
            statement_descriptor: z.string(),
            card_token: z.string().optional(),
            card: z
              .object({
                number: z.string(),
                holder_name: z.string(),
                cvv: z.string(),
                billing_address: z.object({
                  street: z.string(),
                  zip_code: z.string(),
                  city: z.string(),
                  state: z.string(),
                  country: z.string(),
                }),
              })
              .optional(),
          })
          .optional(),
        boleto: z
          .object({
            bank: z.string(),
            instructions: z.string(),
            due_at: z.date(),
            nosso_numero: z.string(),
            type: z.string(),
            document_number: z.string(),
            interest: z.object({
              days: z.number(),
              type: z.string(),
              amount: z.string(),
            }),
            fine: z.object({
              days: z.number(),
              type: z.string(),
              amount: z.string(),
            }),
          })
          .optional(),
        pix: z
          .union([
            z.object({
              expires_in: z.number(),
              expires_at: z.never(),
              additional_information: z.object({
                name: z.string(),
                value: z.string(),
              }),
            }),
            z.object({
              expires_in: z.never(),
              expires_at: z.date(),
              additional_information: z.object({
                name: z.string(),
                value: z.string(),
              }),
            }),
          ])
          .optional(),
        amount: z.number().optional(),
        split: z
          .array(
            z.object({
              amount: z.number(),
              recipient_id: z
                .string()
                .regex(/^rp_[A-Za-z0-9]{16}$/), // rp_XXXXXXXXXXXXXXXX format
              type: z.enum(['percentage', 'flat']),
              options: z.object({
                charge_processing_fee: z.boolean(),
                charge_remainder_fee: z.boolean(),
                liable: z.boolean(),
              }),
            })
          )
          .optional(),
      }).refine(
        (data) => {
          // Ensure the correct object is present depending on the payment_method
          if (data.payment_method === 'credit_card' && !data.credit_card) return false;
          if (data.payment_method === 'boleto' && !data.boleto) return false;
          if (data.payment_method === 'pix' && !data.pix) return false;
          return true;
        },
        {
          message: 'Required payment object is missing for the selected payment method',
          path: ['payments'],
        }
      )
    ),
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
