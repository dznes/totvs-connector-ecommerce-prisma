import { AddressesRepository } from '@/repositories/addresses-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Address, User } from '@prisma/client'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface CreateAddressUseCaseRequest {
  status?: number
  type: string
  country: string
  state: string
  city: string
  zip_code: string
  street: string
  number: number
  neighborhood: string
  complement?: string
  userId: string
}

interface CreateAddressUseCaseResponse {
  address: Address
  user: User
}

export class CreateAddressUseCase {
  constructor(
    private addressesRepository: AddressesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    status,
    type,
    country,
    state,
    city,
    zip_code,
    street,
    number,
    neighborhood,
    complement,
    userId,
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const address = await this.addressesRepository.create({
      status: status ?? 200,
      type,
      country,
      state,
      city,
      zip_code,
      street,
      number,
      neighborhood,
      complement,
      user_id: userId,
      user_code: user.code,
    })

    return { address, user }
  }
}
