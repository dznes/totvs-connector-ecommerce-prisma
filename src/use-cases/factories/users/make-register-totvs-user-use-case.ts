import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterTotvsUserUseCase } from '@/use-cases/users/register-totvs-user'

export function makeRegisterTotvsUserUseCase() {
  const userRepository = new PrismaUsersRepository()
  const registerTotvsUserUseCase = new RegisterTotvsUserUseCase(userRepository)

  return registerTotvsUserUseCase
}
