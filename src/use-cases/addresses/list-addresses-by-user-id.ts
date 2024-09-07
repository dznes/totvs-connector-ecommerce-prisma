import { AddressesRepository } from '@/repositories/addresses-repository'
import { Address } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListAddressesByUSerIdUseCaseResponse {
  addresses: Address[]
}

export class ListAddressesByUserId {
  constructor(private addressesRepository: AddressesRepository) {}

  async execute(userId: string): Promise<ListAddressesByUSerIdUseCaseResponse> {
    const addresses = await this.addressesRepository.listByUserId(userId)

    if (!addresses) {
      throw new ResourceNotFoundError()
    }

    return { addresses }
  }
}
