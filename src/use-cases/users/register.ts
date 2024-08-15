import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { randomUUID } from 'node:crypto'

interface RegisterUseCaseRequest {
  name: string
  email: string
  role: string
  password: string
  gender: string
  birth_date: string
  cpf?: string
  cnpj?: string
  is_customer?: boolean
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    role,
    password,
    gender,
    birth_date,
    cpf,
    cnpj,
    is_customer,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
        code: randomUUID(),
        name,
        email,
        role,
        password_hash,
        gender,
        birthDate: birth_date,
        cpf,
        cnpj,
        is_customer,
    })

    return { user }
  }
}
