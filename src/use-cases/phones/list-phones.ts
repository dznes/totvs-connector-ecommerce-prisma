import { PhonesRepository } from '@/repositories/phones-repository'
import { Phone } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListPhonesUseCaseResponse {
  phone: Phone[]
}

export class ListPhonesUseCase {
  constructor(private phonesRepository: PhonesRepository) {}

  async execute(): Promise<ListPhonesUseCaseResponse> {
    const phone = await this.phonesRepository.list()

    if (!phone) {
      throw new ResourceNotFoundError()
    }

    return { phone }
  }
}
