import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePhoneUseCase } from '@/use-cases/factories/phones/make-create-phone-use-case'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'
import { createRetailClientPhone, fetchTestEnvToken } from '@/http/lib/totvs'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPhoneParamsSchema = z.object({
    status: z.number(),
    type: z.string().optional().default('COMERCIAL'),
    ddd_code: z.string(),
    number: z.string(),
    userId: z.string(),
  })

  const { status, type, ddd_code, number, userId } =
    createPhoneParamsSchema.parse(request.body)

  try {
    const createPhoneUseCase = makeCreatePhoneUseCase()

    const { phone, user } = await createPhoneUseCase.execute({
      status,
      type,
      ddd_code,
      number,
      userId,
    })

    if (user?.cpf) {
      // Fetch the authentication token
      const token = await fetchTestEnvToken()
      await createRetailClientPhone({
        token: token.access_token,
        type,
        cpf: user.cpf,
        ddd: ddd_code,
        number,
      })
    }

    return reply.status(201).send({ phone })
  } catch (err) {
    if (err instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
