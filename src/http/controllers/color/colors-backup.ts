import { fetchToken, getColors } from '@/http/lib/totvs'
import { Color } from '@/types/colors'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpsertColorUseCase } from '@/use-cases/factories/colors/make-upsert-color-use-case'

/**
 * ColorsBackup function to fetch and upsert color data.
 * @param _: FastifyRequest - The incoming request object (not used).
 * @param reply: FastifyReply - The response object to send the response.
 */
export async function ColorsBackup(_: FastifyRequest, reply: FastifyReply) {
  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const pageSize = 500
    const daysStartFromToday = 50
    const daysEndFromToday = 0
    let page = 1
    let isLastPage = false

    // Create an instance of the upsert color use case
    const upsertColorUseCase = makeUpsertColorUseCase()

    // Loop until the last page is reached
    while (!isLastPage) {
      // Fetch the colors from the API with the specified parameters
      const { items, hasNext } = await getColors({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })

      // Upsert each color item into the database
      items.map(async (item: Color) => {
        await upsertColorUseCase.execute({
          status: 200,
          code: item.colorCode,
          title: item.colorName,
          variation_type: 1,
          background_color: '',
          image_tags: '',
          image_url: '',
          image_text: '',
          image_label: '',
        })
      })

      // Check if there are more pages to fetch
      if (!hasNext) {
        isLastPage = true
      } else {
        page++
      }
    }

    // Return the number of pages processed in the API response
    return reply.status(200).send(JSON.stringify({ pages: page }))
  } catch (err) {
    // Return an HTTP error response in case of failure
    return reply.status(500).send({ error: 'Failed to list colors' })
  }
}
