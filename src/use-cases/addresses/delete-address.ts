import { AddressesRepository } from '@/repositories/addresses-repository'
import { Address } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface DeleteAddressUseCaseRequest {
  id: string
}

export interface DeleteAddressUseCaseResponse {
  address: Address
}

export class DeleteAddressUseCase {
  constructor(private addressesRepository: AddressesRepository) {}

  async execute({
    id,
  }: DeleteAddressUseCaseRequest): Promise<DeleteAddressUseCaseResponse> {
    const address = await this.addressesRepository.findById(id)

    if (!address) {
      throw new ResourceNotFoundError()
    }

    await this.addressesRepository.delete(address)

    return {
      address,
    }
  }
}
