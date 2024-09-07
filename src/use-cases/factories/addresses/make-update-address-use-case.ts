import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { UpdateAddressUseCase } from '@/use-cases/addresses/update-address'

export function makeUpdateAddressUseCase() {
  const addressRepository = new PrismaAddressesRepository()
  const updateAddressUseCase = new UpdateAddressUseCase(addressRepository)

  return updateAddressUseCase
}
