import { calculateDeliveryDate, calculatePrice } from '@/http/lib/correios'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function calculateDeliveryPriceAndDate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    codigoServico: z.string(),
    cepDestino: z.string().min(8),
    cepOrigem: z.string().optional().default(`${process.env.STORE_CEP}`),
    pesoObjeto: z.string(), // In grams
    tipoObjeto: z.string().optional().default('2'), // Default 2 is for package
    comprimento: z.string().optional(), // In centimeters
    largura: z.string().optional(), // In centimeters
    altura: z.string().optional(), // In centimeters
    diametro: z.string().optional(), // In centimeters
  })
  const {
    codigoServico,
    cepDestino,
    cepOrigem,
    pesoObjeto,
    tipoObjeto,
    comprimento,
    largura,
    altura,
    diametro,
  } = bodySchema.parse(request.body)
  try {
    const { pcFinal } = await calculatePrice({
      codigoServico,
      cepDestino,
      cepOrigem,
      pesoObjeto,
      tipoObjeto,
      comprimento,
      largura,
      altura,
      diametro,
    })
    const { prazoEntrega, dataMaxima } = await calculateDeliveryDate({
      codigoServico,
      cepDestino,
      cepOrigem,
    })

    return reply.status(201).send({
      price: pcFinal,
      deliveryDate: prazoEntrega,
      maxDate: new Date(dataMaxima),
    })
  } catch (err) {
    if (err) {
      return reply.status(409).send(JSON.stringify(err))
    }
    throw err
  }
}
