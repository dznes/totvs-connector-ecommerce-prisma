import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserPasswordUseCase } from '@/use-cases/users/update-user-password'


export function makeUpdateUserPasswordUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new UpdateUserPasswordUseCase(userRepository)

  return useCase
}
