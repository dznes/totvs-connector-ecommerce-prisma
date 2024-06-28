import { FastifyInstance } from 'fastify'

export async function UserRoutes(app: FastifyInstance) {
  app.get('/user', async (request, reply) => {
    return reply.status(200).send({ message: 'Hello, User!' })
  })
}
