import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FindUserWithSameCpfUseCase } from '../../users/find-user-with-same-cpf'

export function makeFindUserWithSameCpfUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new FindUserWithSameCpfUseCase(usersRepository)

  return useCase
}
