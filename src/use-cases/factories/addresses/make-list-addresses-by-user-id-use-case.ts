import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { ListAddressesByUserId } from '@/use-cases/addresses/list-addresses-by-user-id'

export function makeListAddressesByUserIdUseCase() {
  const addressRepository = new PrismaAddressesRepository()
  const listAddressesByUserIdUseCase = new ListAddressesByUserId(
    addressRepository,
  )

  return listAddressesByUserIdUseCase
}
