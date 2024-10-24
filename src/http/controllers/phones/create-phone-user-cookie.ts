import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePhoneUseCase } from '@/use-cases/factories/phones/make-create-phone-use-case'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'

export async function checkoutCreate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPhoneParamsSchema = z.object({
    status: z.number(),
    ddd_code: z.string(),
    number: z.string(),
  })

  const { status, ddd_code, number } = createPhoneParamsSchema.parse(
    request.body,
  )

  try {
    const createPhoneUseCase = makeCreatePhoneUseCase()

    await createPhoneUseCase.execute({
      userId: request.user.sub,
      status,
      ddd_code,
      number,
    })
  } catch (err) {
    if (err instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }

  return reply.status(201).send()
}
