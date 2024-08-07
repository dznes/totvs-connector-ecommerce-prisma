import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetUserByIdUseCaseRequest {
  id: string
}

interface GetUserByIdUseCaseResponse {
  user: User
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findByIdWithNested(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
