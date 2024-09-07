import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'
import { makeDeletePhoneUseCase } from '@/use-cases/factories/phones/make-delete-phone-use-case'

export async function deletePhone(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    id: z.string(),
  })

  const { id } = registerBodySchema.parse(request.params)

  try {
    const registerUseCase = makeDeletePhoneUseCase()

    await registerUseCase.execute({
      id,
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
