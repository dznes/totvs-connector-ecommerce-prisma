import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchUsersUseCase } from '@/use-cases/factories/users/make-search-users-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchUsersQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(20),
  })

  const { q, page, perPage } = searchUsersQuerySchema.parse(request.query)

  const searchUsersUseCase = makeSearchUsersUseCase()

  const { users, count, totalPages } = await searchUsersUseCase.execute({
    query: q,
    page,
    perPage,
  })

  return reply.status(200).send({
    users,
    count,
    perPage,
    totalPages,
  })
}
