import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreatePhoneUseCase } from '@/use-cases/phones/create-phone'

export function makeCreatePhoneUseCase() {
  const phonesRepository = new PrismaPhonesRepository()
  const usersRepository = new PrismaUsersRepository()
  const createPhoneUseCase = new CreatePhoneUseCase(
    phonesRepository,
    usersRepository,
  )

  return createPhoneUseCase
}
