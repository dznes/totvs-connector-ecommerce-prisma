import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetClassificationBySlugUseCase } from '@/use-cases/factories/classifications/make-get-classification-by-slug-use-case'

export async function getBySlug(request: FastifyRequest, reply: FastifyReply) {
  const GetClassificationBySlugParamsSchema = z.object({
    slug: z.string(),
  })

  const { slug } = GetClassificationBySlugParamsSchema.parse(request.params)

  try {
    const getClassificationBySlugUseCase = makeGetClassificationBySlugUseCase()

    const { classification } = await getClassificationBySlugUseCase.execute({
      slug,
    })
    return reply.status(201).send({ classification })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    // return reply.status(500).send() // FIX ME
    throw err
  }
}
