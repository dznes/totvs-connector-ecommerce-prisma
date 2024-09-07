import { PhonesRepository } from '@/repositories/phones-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Phone } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreatePhoneUseCaseRequest {
  status: number
  ddd_code: string
  number: string
  userId: string
}

interface CreatePhoneUseCaseResponse {
  phone: Phone
}

export class CreatePhoneUseCase {
  constructor(
    private phonesRepository: PhonesRepository,
    private usersRepository: UsersRepository

  ) {}

  async execute({
    status,
    ddd_code,
    number,
    userId,
  }: CreatePhoneUseCaseRequest): Promise<CreatePhoneUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
        throw new ResourceNotFoundError()
    }
    
    const phone = await this.phonesRepository.create({
      status: status ?? 200,
      ddd_code,
      number,
      user_id: userId,
      user_code: user.code,
    })

    return { phone }
  }
}
