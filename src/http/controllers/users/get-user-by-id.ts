import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetUserByIdUseCase } from '@/use-cases/factories/users/make-get-user-by-id-use-case'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const GetUserByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = GetUserByIdParamsSchema.parse(request.params)

  try {
    const getUserByIdUseCase = makeGetUserByIdUseCase()

    const { user } = await getUserByIdUseCase.execute({
      id,
    })
    return reply.status(201).send({ user })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
