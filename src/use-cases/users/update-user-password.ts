import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import bcrypt from 'bcryptjs'

export interface UpdateUserPasswordUseCaseRequest {
  code: string
  password?: string
}

export interface UpdateUserPasswordUseCaseResponse {
  user: User
}

export class UpdateUserPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    code,
    password,
  }: UpdateUserPasswordUseCaseRequest): Promise<UpdateUserPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByCode(code)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (password) {
      const password_hash = await bcrypt.hash(password, 6)
      user.password_hash = password_hash
    }

    user.updated_at = new Date()

    await this.usersRepository.update(user)

    return {
      user,
    }
  }
}
