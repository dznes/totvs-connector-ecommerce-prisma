import { PhonesRepository } from '@/repositories/phones-repository'
import { Phone } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListPhonesByUserIdUseCaseResponse {
  phones: Phone[]
}

export class ListPhonesByUserIdUseCase {
  constructor(private phonesRepository: PhonesRepository) {}

  async execute(userId: string): Promise<ListPhonesByUserIdUseCaseResponse> {
    const phones = await this.phonesRepository.listByUserId(userId)

    if (!phones) {
      throw new ResourceNotFoundError()
    }

    return { phones }
  }
}
