import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { ListAddressesUseCase } from '@/use-cases/addresses/list-addresses'

export function makeListAddressesUseCase() {
  const addressRepository = new PrismaAddressesRepository()
  const listAddressesUseCase = new ListAddressesUseCase(addressRepository)

  return listAddressesUseCase
}
