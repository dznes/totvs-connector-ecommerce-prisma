import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListCategoriesUseCase } from '@/use-cases/factories/categories/make-list-categories-use-case'

export async function listCategories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listCategoriesUseCase = makeListCategoriesUseCase()

    const category = await listCategoriesUseCase.execute()
    return reply.status(201).send({ category })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
