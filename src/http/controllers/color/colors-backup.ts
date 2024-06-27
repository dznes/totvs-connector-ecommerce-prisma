import { fetchToken, listColors } from '@/http/lib/totvs'
import { Color } from '@/types/colors'
// import { BackupData } from '@/utils/backup'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpsertColorUseCase } from '@/use-cases/factories/colors/make-upsert-color-use-case'

export async function ColorsBackup(
  _: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = await fetchToken()
    const pageSize = 100
    let page = 1
    let colors: Color[] = []

    // Fetch the initial page to get the total number of pages.
    const initialData = await listColors({
      token: token.access_token,
      page,
      pageSize,
    })
    colors = colors.concat(initialData.items)
    const totalPages = initialData.totalPages

    // Fetch remaining pages
    for (page = 2; page <= totalPages; page++) {
      const data = await listColors({
        token: token.access_token,
        page,
        pageSize,
      })
      const page_colors = data.items
      colors = colors.concat(page_colors) // Accumulate items from each page
      console.log(`${colors.length} items processados.`)
    }

    // Initialize Upsert Color Use Case
    const upsertColorUseCase = makeUpsertColorUseCase()

    // // Save all items to JSON file
    // await updateJsonFile('products.json', colors);
    colors.map((color) => {
      upsertColorUseCase.execute({
        status: 200,
        code: color.colorCode,
        title: color.colorName,
        variation_type: 1,
        background_color: '',
        image_tags: '',
        image_url: '',
        image_text: '',
        image_label: '',
      })
    })

    // backupData.insertMany('color', indexedData)

    // Return the complete list of items in the API response
    return reply.status(200).send(JSON.stringify({ colors, totalPages }))
  } catch (err) {
    console.log(err)
    // It's better to return an HTTP error response
    return reply.status(500).send({ error: 'Failed to list colors' })
  }
}
