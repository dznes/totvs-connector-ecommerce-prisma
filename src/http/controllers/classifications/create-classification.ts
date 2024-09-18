import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateClassificationUseCase } from '@/use-cases/factories/classifications/make-create-classification-use-case'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    code: z.string().optional(),
    type_code: z.string(),
    type_name: z.string(),
    status: z.number().optional().default(200),
    title: z.string(),
    slug: z.string().optional(),
  })

  const { code, type_code, type_name, status, title, slug } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateClassificationUseCase()

    await registerUseCase.execute({
      code,
      type_code,
      type_name,
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
