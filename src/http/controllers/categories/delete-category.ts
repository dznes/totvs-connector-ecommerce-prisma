import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'
import { makeDeleteCategoryUseCase } from '@/use-cases/factories/categories/make-delete-category-use-case'

export async function deleteCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  try {
    const registerUseCase = makeDeleteCategoryUseCase()

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
