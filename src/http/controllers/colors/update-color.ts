import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateColorsUseCase } from '@/use-cases/factories/colors/make-update-color-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const UpdateColorBodySchema = z.object({
    code: z.string(),
    backgroundColor: z.coerce.string(),
  })

  const { code, backgroundColor } = UpdateColorBodySchema.parse(request.body)

  const searchColorsUseCase = makeUpdateColorsUseCase()

  await searchColorsUseCase.execute({
    code,
    backgroundColor,
  })

  return reply.status(200).send()
}
