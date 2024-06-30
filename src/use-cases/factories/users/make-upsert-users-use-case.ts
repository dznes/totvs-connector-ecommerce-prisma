import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpsertUsersUseCase } from '../../users/upsert-users'

export function makeUpsertUsersUseCase() {
  const userRepository = new PrismaUsersRepository()
  const upsertUserUseCase = new UpsertUsersUseCase(userRepository)

  return upsertUserUseCase
}
