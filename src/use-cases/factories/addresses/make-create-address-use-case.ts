import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateAddressUseCase } from '@/use-cases/addresses/create-address'

export function makeCreateAddressUseCase() {
  const addressRepository = new PrismaAddressesRepository()
  const usersRepository = new PrismaUsersRepository()
  const createAddressUseCase = new CreateAddressUseCase(
    addressRepository,
    usersRepository,
  )

  return createAddressUseCase
}
