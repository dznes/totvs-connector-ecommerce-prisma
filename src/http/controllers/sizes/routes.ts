import { FastifyInstance } from 'fastify'
import { search } from './search-sizes'


export async function SizesRoutes(app: FastifyInstance) {
  app.get('/api/sizes/search', search)
}
