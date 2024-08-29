import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function AppRoutes(app: FastifyInstance) {
  app.get('/backup/products', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Step 1: Hit the SKU Details route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/sku/detail/backup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Step 2: Hit the SKU Prices route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/sku/price/backup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Step 3: Hit the SKU Costs route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/sku/cost/backup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Step 4: Hit the SKU Stock route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/sku/stock/backup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Step 5: Hit the Product Details route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/products/backup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Step 6: Hit the Product Images route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/vtex/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Respond with a success message once all requests are done
      reply.send({ message: 'All routes were hit successfully' })
    } catch (error) {
      console.error('Error in backup process:', error)
      reply.status(500).send({ error: 'An error occurred while processing the backup process' })
    }
  })
  app.get('/backup/user-orders', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Step 1: Hit the SKU Details route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/user/retail/backup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Step 2: Hit the SKU Prices route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/user/wholesale/backup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Step 3: Hit the SKU Costs route
      await fetch('https://totvs-connector-ecommerce-prisma.onrender.com/order/backup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Respond with a success message once all requests are done
      reply.send({ message: 'All routes were hit successfully' })
    } catch (error) {
      console.error('Error in backup process:', error)
      reply.status(500).send({ error: 'An error occurred while processing the backup process' })
    }
  })
}
