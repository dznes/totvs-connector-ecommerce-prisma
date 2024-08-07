import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface SearchUsersUseCaseRequest {
  query: string
  page: number
  perPage: number
}

export interface SearchUsersUseCaseResponse {
  users: User[]
  count: number
  totalPages: number
}

export class SearchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchUsersUseCaseRequest): Promise<SearchUsersUseCaseResponse> {
    const users = await this.usersRepository.searchMany(query, page, perPage)
    const count = await this.usersRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      users,
      count,
      totalPages,
    }
  }
}
