import { AddressesRepository } from '@/repositories/addresses-repository'
import { Address } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface UpdateAddressUseCaseRequest {
  id: string
  type?: string
  country?: string
  state?: string
  city?: string
  zip_code?: string
  street?: string
  number?: number
  neighborhood?: string
  complement?: string
}

export interface UpdateAddressUseCaseResponse {
  address: Address
}

export class UpdateAddressUseCase {
  constructor(private addressesRepository: AddressesRepository) {}

  async execute({
    id,
    type,
    country,
    state,
    city,
    zip_code,
    street,
    number,
    neighborhood,
    complement,
  }: UpdateAddressUseCaseRequest): Promise<UpdateAddressUseCaseResponse> {
    const address = await this.addressesRepository.findById(id)

    if (!address) {
      throw new ResourceNotFoundError()
    }
    if (type) {
      address.type = type
    }
    if (country) {
      address.country = country
    }
    if (state) {
      address.state = state
    }
    if (city) {
      address.city = city
    }
    if (zip_code) {
      address.zip_code = zip_code
    }
    if (street) {
      address.street = street
    }
    if (zip_code) {
      address.zip_code = zip_code
    }
    if (number) {
      address.number = number
    }
    if (neighborhood) {
      address.neighborhood = neighborhood
    }
    if (complement) {
      address.complement = complement
    }

    address.updated_at = new Date()

    await this.addressesRepository.update(address)

    return {
      address,
    }
  }
}
