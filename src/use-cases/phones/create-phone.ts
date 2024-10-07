import { PhonesRepository } from '@/repositories/phones-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Phone, User } from '@prisma/client'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface CreatePhoneUseCaseRequest {
  status: number
  type: string
  ddd_code: string
  number: string
  userId: string
}

interface CreatePhoneUseCaseResponse {
  phone?: Phone
  user: User
}

export class CreatePhoneUseCase {
  constructor(
    private phonesRepository: PhonesRepository,
    private usersRepository: UsersRepository

  ) {}

  async execute({
    status,
    type,
    ddd_code,
    number,
    userId,
  }: CreatePhoneUseCaseRequest): Promise<CreatePhoneUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
        throw new UserNotFoundError()
    }

    const findPhoneByUserIdPhoneType = await this.phonesRepository.findByUserIdPhoneType(userId, type)

    if (findPhoneByUserIdPhoneType) {
      await this.phonesRepository.update({
        ...findPhoneByUserIdPhoneType,
        status: status ?? 200,
        ddd_code,
        number,
      })

      return ({ user })
    } else {
      const phone = await this.phonesRepository.create({
        status: status ?? 200,
        type: type ?? 'COMERCIAL',
        ddd_code,
        number,
        user_id: userId,
        user_code: user.code,
      })

      return { phone, user }
    }
  }
}
