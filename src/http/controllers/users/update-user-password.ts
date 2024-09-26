import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserPasswordUseCase } from '@/use-cases/factories/users/make-update-user-password'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function updateUserPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPhoneParamsSchema = z.object({
    code: z.string(),
    password: z.string().optional(),
  })

  const { code, password } = createPhoneParamsSchema.parse(
    request.body,
  )

  try {
    const updateUserPassword = makeUpdateUserPasswordUseCase()

    await updateUserPassword.execute({
      code,
      password,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }

  return reply.status(201).send()
}
