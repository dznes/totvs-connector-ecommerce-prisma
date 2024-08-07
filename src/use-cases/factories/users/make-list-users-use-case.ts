import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListUsersUseCase } from '@/use-cases/users/list-users'

export function makeListUsersUseCase() {
  const userRepository = new PrismaUsersRepository()
  const listUsersUseCase = new ListUsersUseCase(userRepository)

  return listUsersUseCase
}
