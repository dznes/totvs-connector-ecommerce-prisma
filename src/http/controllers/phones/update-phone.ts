import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'
import { makeUpdatePhoneUseCase } from '@/use-cases/factories/phones/make-update-phone-use-case'

export async function updateStatus(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updatePhoneBodySchema = z.object({
    id: z.string(),
    status: z.number(),
    ddd_code: z.string(),
    number: z.string(),
  })

  const { id, status, ddd_code, number } = updatePhoneBodySchema.parse(
    request.body,
  )

  try {
    const updatePhoneUseCase = makeUpdatePhoneUseCase()

    await updatePhoneUseCase.execute({
      id,
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
