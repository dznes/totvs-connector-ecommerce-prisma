import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FindUserWithSameCnpjUseCase } from '../../users/find-user-with-same-cnpj'

export function makeFindUserWithSameCnpjUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new FindUserWithSameCnpjUseCase(usersRepository)

  return useCase
}
