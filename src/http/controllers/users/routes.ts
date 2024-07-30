import { FastifyInstance } from 'fastify'
import { listTotvsUsers } from './list-totvs-users'
import { retailUsersBackup } from './retail-users-backup'
import { wholesaleUsersBackup } from './wholesale-users-backup'

export async function UserRoutes(app: FastifyInstance) {
  app.get('/totvs/user', listTotvsUsers)
  app.get('/user/retail/backup', retailUsersBackup)
  app.get('/user/wholesale/backup', wholesaleUsersBackup)
}
