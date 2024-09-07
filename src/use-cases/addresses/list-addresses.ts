import { AddressesRepository } from '@/repositories/addresses-repository'
import { Address } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListAddressesUseCaseResponse {
  addresses: Address[]
}

export class ListAddressesUseCase {
  constructor(private addressesRepository: AddressesRepository) {}

  async execute(): Promise<ListAddressesUseCaseResponse> {
    const addresses = await this.addressesRepository.list()

    if (!addresses) {
      throw new ResourceNotFoundError()
    }

    return { addresses }
  }
}
