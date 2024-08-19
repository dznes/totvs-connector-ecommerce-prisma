import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import { AppRoutes } from './http/controllers/routes'
import { OrderRoutes } from './http/controllers/orders/routes'
import { ColorRoutes } from './http/controllers/colors/routes'
import { SkuRoutes } from './http/controllers/sku/routes'
import { UserRoutes } from './http/controllers/users/routes'
import { ProductRoutes } from './http/controllers/products/routes'
import { ProductImagesRoutes } from './http/controllers/product-images/routes'
import { SizesRoutes } from './http/controllers/sizes/routes'
import { OrderItemsRoutes } from './http/controllers/order-items/routes'

export const app = fastify()

// Register @fastify/cors with options as needed
app.register(fastifyCors, {
  origin: ['http://localhost:3000', 'http://localhost:3010'], // Allowed origins
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(AppRoutes)
app.register(OrderRoutes)
app.register(ColorRoutes)
app.register(SkuRoutes)
app.register(UserRoutes)
app.register(ProductRoutes)
app.register(ProductImagesRoutes)
app.register(SizesRoutes)
app.register(OrderItemsRoutes)

// Ao adicionar o "_" na frente do parâmetro que não vai ser utilizado ou apenas o "_" no lugar do parâmetro, você informa que ele não vai ser utilizado.
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
