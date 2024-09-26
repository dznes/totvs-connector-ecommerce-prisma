import { FastifyInstance } from 'fastify'
import { listTotvsUsers } from './list-totvs-users'
import { retailUsersBackup } from './retail-users-backup'
import { wholesaleUsersBackup } from './wholesale-users-backup'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { getById } from './get-user-by-id'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { listUsers } from './list-users'
import { search } from './search-user'
import { registerTotvsUser } from './retail-user-register'
import { updateUserPassword } from './update-user-password'

export async function UserRoutes(app: FastifyInstance) {
  app.get('/totvs/user', listTotvsUsers)
  app.get('/user/retail/backup', retailUsersBackup)
  app.get('/user/wholesale/backup', wholesaleUsersBackup)

  app.post('/api/users', register)
  app.post('/api/users-totvs', registerTotvsUser)
  app.post('/api/sessions', authenticate)
  app.patch('/api/token/refresh', refresh)
  app.post('/api/user/update-password', updateUserPassword)

  app.get('/api/me', { onRequest: [verifyJwt] }, profile)
  app.get('/api/users/:id', getById)
  app.get('/api/users/all', listUsers)
  app.get('/api/users/search', search)
}
