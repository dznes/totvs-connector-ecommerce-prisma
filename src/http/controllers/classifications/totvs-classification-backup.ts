import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { fetchToken, getClassifications } from '@/http/lib/totvs'
import { makeUpsertClassificationUseCase } from '@/use-cases/factories/classifications/make-upsert-classifications-use-case'

export async function upsertTotvsClassifications(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    typeCodeList: z.array(z.number()).optional(),
  })
  const { typeCodeList } = registerBodySchema.parse(request.body)

  try {
    const token = await fetchToken()
    const props = {
      token: token.access_token,
      typeCodeList,
    }

    const { items } = await getClassifications(props)

    const upsertClassificationUseCase = makeUpsertClassificationUseCase()

    for (const item of items) {
      await upsertClassificationUseCase.execute({
        code: item.code,
        title: item.name,
        type_code: item.typeCode.toString(),
        type_name: item.typeName,
        status: 200,
      })
    }

    return reply
      .status(201)
      .send({ message: 'Classifications upserted successfully' })
  } catch (err) {
    console.log(err)
    return reply.status(409).send({ message: JSON.stringify(err) })
  }
}
