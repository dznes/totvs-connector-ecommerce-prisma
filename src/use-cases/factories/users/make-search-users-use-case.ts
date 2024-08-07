import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SearchUsersUseCase } from '@/use-cases/users/search-users'

export function makeSearchUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new SearchUsersUseCase(usersRepository)

  return useCase
}
