import { PhonesRepository } from '@/repositories/phones-repository'
import { Phone } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface DeletePhoneUseCaseRequest {
  id: string
}

export interface DeletePhoneUseCaseResponse {
  phone: Phone
}

export class DeletePhoneUseCase {
  constructor(private phoney: PhonesRepository) {}

  async execute({
    id,
  }: DeletePhoneUseCaseRequest): Promise<DeletePhoneUseCaseResponse> {
    const phone = await this.phoney.findById(id)

    if (!phone) {
      throw new ResourceNotFoundError()
    }

    await this.phoney.delete(phone)

    return {
      phone,
    }
  }
}
