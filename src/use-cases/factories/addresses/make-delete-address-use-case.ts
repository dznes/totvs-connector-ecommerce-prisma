import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { DeleteAddressUseCase } from '@/use-cases/addresses/delete-address'

export function makeDeleteAddressUseCase() {
  const addressRepository = new PrismaAddressesRepository()
  const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository)

  return deleteAddressUseCase
}
