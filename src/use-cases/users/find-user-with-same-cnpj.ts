import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface FindUserWithSameCnpjUseCaseRequest {
  cnpj: string
}

interface FindUserWithSameCnpjUseCaseResponse {
  user: User
}

export class FindUserWithSameCnpjUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    cnpj,
  }: FindUserWithSameCnpjUseCaseRequest): Promise<FindUserWithSameCnpjUseCaseResponse | null> {
    const user = await this.usersRepository.findByCnpj(cnpj)

    if (!user) {
      return null
    }

    return { user }
  }
}
