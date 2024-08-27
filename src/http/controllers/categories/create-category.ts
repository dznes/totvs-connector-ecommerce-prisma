import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateCategoryUseCase } from '@/use-cases/factories/categories/make-create-category-use-case'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    status: z.number(),
    title: z.string(),
    slug: z.string().optional(),
  })

  const { status, title, slug } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateCategoryUseCase()

    await registerUseCase.execute({
      status,
      title,
      slug,
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
