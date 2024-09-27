import { createOrderPayment } from '@/http/lib/pagarme'
import { createOrder, fetchTestEnvToken } from '@/http/lib/totvs';
import { randomUUID } from 'crypto';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function orderComplete(request: FastifyRequest, reply: FastifyReply) {
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
    customerCode: z.string(),
    shipping: z.object({
      address: z.object({
        street: z.string(),
        zip_code: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        number: z.coerce.number(),
        complement: z.string().optional(),
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
                number: z.string().optional(),
                holder_name: z.string().optional(),
                cvv: z.string().optional(),
                billing_address: z.object({
                  line_1: z.string(),
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
            due_at: z.string(),
            nosso_numero: z.string(),
            type: z.string(),
            document_number: z.string(),
            interest: z.object({
              days: z.number(),
              type: z.string(),
              amount: z.string(),
            }).optional(),
            fine: z.object({
              days: z.number(),
              type: z.string(),
              amount: z.number(),
            }).optional(),
          })
          .optional(),
        pix:z
        .union([
          z.object({
            expires_in: z.number(),
            additional_information: z
              .object({
                name: z.string(),
                value: z.string(),
              })
              .optional(),
          }),
          z.object({
            expires_at: z.date(),
            additional_information: z
              .object({
                name: z.string(),
                value: z.string(),
              })
              .optional(),
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
        
  const { customer, customerCode, shipping, items, payments } = createOrderPaymentBodySchema.parse(request.body);

  try {
    const pagarmeShipping = {
      address: {
        line_1: `${shipping.address.street}, ${shipping.address.number}`,
        line_2: shipping.address.complement,
        zip_code: shipping.address.zip_code,
        city: shipping.address.city,
        state: shipping.address.state,
        country: shipping.address.country.toLowerCase() === 'brasil' ? 'BR' : shipping.address.country,
      },
      amount: shipping.amount,
      description: shipping.description,
      recipient_name: shipping.recipient_name,
      recipient_phone: shipping.recipient_phone,
    }

    const { id, code, amount, currency, closed, status, charges } = await createOrderPayment({ customer, shipping: pagarmeShipping, items, payments })

    // ADD ERROR HANDLIG FOR TOTVS API WHEN IT DOESNT RETURN A "charges" PROPERTY
    if (!charges) {
      return reply.status(500).send({ message: 'Pagar.me did not return charges property.' });
    }

    const orderId = randomUUID()

    const token = await fetchTestEnvToken()

    const order = {
      id: orderId,
      created_at: charges[0].last_transaction.created_at,
      operationCode: 510,
      freight_value: shipping.amount / 100,
      total_value: charges[0].last_transaction.amount / 100,
      items: items.map((item) => {
        return {
          productCode: item.code,
          price: item.amount / 100,
          quantity: item.quantity,
          billingForecastDate: charges[0].last_transaction.created_at,
        }
      })
    }

    const client = {
      code: customerCode,
      cpf: customer.document,
    }

    const payment = {
      transaction_id: charges[0].last_transaction.id,
      nsu: charges[0].last_transaction.acquirer_nsu,
      authorization_code: charges[0].last_transaction.acquirer_auth_code,
      card_brand: charges[0].last_transaction.card.brand,
      installments: charges[0].last_transaction.installments,
      total_value: charges[0].last_transaction.amount / 100,
      created_at: charges[0].last_transaction.created_at,
    }
    const totvsShipping = {
      street: shipping.address.street,
      zip_code: shipping.address.zip_code,
      city: shipping.address.city,
      state: shipping.address.state,
      country: shipping.address.country,
      number: shipping.address.number,
      complement: shipping.address.complement,
    }

    const totvsOrder = await createOrder({
      token: token.access_token, 
      order, 
      client, 
      payment, 
      shipping: totvsShipping
    })

    if (!totvsOrder.orderCode) {
      return reply.status(500).send({ message: 'TOTVS API did not return orderCode property.' });
    }

    // ADD ERROR HANDLIG FOR TOTVS API WHEN IT DOESNT RETURN A "orderCode" PROPERTY

    return reply.status(201).send({ totvsOrder })

  } catch (err) {
    if (err) {
      return reply.status(409).send({ message: err })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
