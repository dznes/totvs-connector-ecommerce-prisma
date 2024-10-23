import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { CodeAlreadyExistsError } from '../errors/totvs-code-already-exists-error'

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
  utm_campaign?: string
  utm_source?: string
  utm_medium?: string
  utm_content?: string
  utm_term?: string
  referrer?: string
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
    utm_campaign,
    utm_source,
    utm_medium,
    utm_content,
    utm_term,
    referrer,
  }: RegisterTotvsUserUseCaseRequest): Promise<RegisterTotvsUserUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const userWithSameCode = await this.usersRepository.findByCode(code)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    if (userWithSameCode) {
      throw new CodeAlreadyExistsError()
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
        utm_campaign,
        utm_source,
        utm_medium,
        utm_content,
        utm_term,
        referrer,
      })

      return { user };
  } catch (error) {
    throw error;
  }
  }
}
