import { PhonesRepository } from '@/repositories/phones-repository'
import { Phone } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface UpdatePhoneUseCaseRequest {
  id: string
  status: number
  ddd_code: string
  number: string
}

export interface UpdatePhoneUseCaseResponse {
  phone: Phone
}

export class UpdatePhoneUseCase {
  constructor(private phonesRepository: PhonesRepository) {}

  async execute({
    id,
    status,
    ddd_code,
    number,
  }: UpdatePhoneUseCaseRequest): Promise<UpdatePhoneUseCaseResponse> {
    const phone = await this.phonesRepository.findById(id)

    if (!phone) {
      throw new ResourceNotFoundError()
    }

    if (status) {
      phone.status = status
    }
    if (ddd_code) {
      phone.ddd_code = ddd_code
    }
    if (number) {
      phone.number = number
    }

    phone.updated_at = new Date()

    await this.phonesRepository.update(phone)

    return {
      phone,
    }
  }
}
