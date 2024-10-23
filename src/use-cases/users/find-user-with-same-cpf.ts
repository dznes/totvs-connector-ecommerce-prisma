import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface FindUserWithSameCpfUseCaseRequest {
  cpf: string
}

interface FindUserWithSameCpfUseCaseResponse {
  user: User
}

export class FindUserWithSameCpfUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    cpf,
  }: FindUserWithSameCpfUseCaseRequest): Promise<FindUserWithSameCpfUseCaseResponse | null> {
    const user = await this.usersRepository.findByCpf(cpf)

    if (!user) {
      return null
    }

    return { user }
  }
}
