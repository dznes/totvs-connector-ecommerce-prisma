import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetCategoryBySlugUseCase } from '@/use-cases/factories/categories/make-get-category-by-slug-use-case'

export async function getBySlug(request: FastifyRequest, reply: FastifyReply) {
  const GetCategoryBySlugParamsSchema = z.object({
    slug: z.string(),
  })

  const { slug } = GetCategoryBySlugParamsSchema.parse(request.params)

  try {
    const getCategoryBySlugUseCase = makeGetCategoryBySlugUseCase()

    const { category } = await getCategoryBySlugUseCase.execute({
      slug,
    })
    return reply.status(201).send({ category })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
