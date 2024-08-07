import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserByIdUseCase } from '../../users/get-user-by-id'

export function makeGetUserByIdUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserByIdUseCase(usersRepository)

  return useCase
}
