import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListUsersUseCase } from '@/use-cases/factories/users/make-list-users-use-case'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listUsersUseCase = makeListUsersUseCase()

    const { users } = await listUsersUseCase.execute()
    return reply.status(201).send({ users })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
