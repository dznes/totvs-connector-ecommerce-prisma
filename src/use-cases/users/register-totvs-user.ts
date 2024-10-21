import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

// interface CreateUserAddress {
//   cep: string
//   sequence?: number
//   addressType: string
//   address: string
//   number: number
//   complement?: string | null
//   neighborhood: string | null
//   ibgeCityCode?: number
//   cityName: string
//   stateAbbreviation: string
//   bcbCountryCode?: number
//   countryName?: string
// }

interface RegisterTotvsUserUseCaseRequest {
  code: string
  name: string
  email: string
  password: string
  regitered_at: Date
  rg?: string | null
  birthDate: string | null
  cpf: string | null
  cnpj: string | null
  gender: string | null
  is_customer?: boolean
  is_supplier?: boolean
  is_representative?: boolean
  is_shipping_company?: boolean
  is_employee?: boolean
  is_active?: boolean
  employee_status?: string
}

interface RegisterTotvsUserUseCaseResponse {
  user: User
}

export class RegisterTotvsUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    code,
    name,
    email,
    password,
    regitered_at,
    rg,
    birthDate,
    cpf,
    cnpj,
    gender,
    is_customer,
    is_supplier,
    is_representative,
    is_shipping_company,
    is_employee,
    is_active,
    employee_status,
  }: RegisterTotvsUserUseCaseRequest): Promise<RegisterTotvsUserUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    try {

      const user = await this.usersRepository.create({
        code,
        status: 200,
        name,
        email,
        password_hash,
        regitered_at,
        rg,
        birthDate: birthDate ?? null,
        cpf,
        cnpj: cnpj ?? null,
        gender,
        is_customer: is_customer ?? false,
        is_supplier: is_supplier ?? false,
        is_representative: is_representative ?? false,
        is_shipping_company: is_shipping_company ?? false,
        is_employee: is_employee ?? false,
        is_active: is_active ?? true,
        employee_status,
        totvs_branch_code: 1,
      })

      console.log("User created successfully:", user);
      return { user };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
  }
}
