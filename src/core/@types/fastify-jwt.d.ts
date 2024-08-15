import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'admin' | 'customer'
      sub: string
    }
  }
}
