import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListClassificationsUseCase } from '@/use-cases/factories/classifications/make-list-classifications-use-case'

export async function listClassifications(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listClassificationsUseCase = makeListClassificationsUseCase()

    const { classification } = await listClassificationsUseCase.execute()
    return reply.status(201).send({ classification })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
