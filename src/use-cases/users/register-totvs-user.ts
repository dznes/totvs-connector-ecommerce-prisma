import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { CreateUserAddress } from '@/http/lib/totvs/interfaces/user-info'

interface RegisterTotvsUserUseCaseRequest {
  code: string
  name: string
  email: string
  password: string
  regitered_at: Date
  rg: string | null
  birthDate: string | null
  cpf: string | null
  gender: string | null
  is_customer?: boolean
  is_supplier?: boolean
  is_representative?: boolean
  is_shipping_company?: boolean
  is_employee?: boolean
  is_active?: boolean
  employee_status?: string
  phone_number: string
  address: CreateUserAddress
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
    phone_number,
    regitered_at,
    rg,
    birthDate,
    address,
    cpf,
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
      gender,
      is_customer: is_customer ?? false,
      is_supplier: is_supplier ?? false,
      is_representative: is_representative ?? false,
      is_shipping_company: is_shipping_company ?? false,
      is_employee: is_employee ?? false,
      is_active: is_active ?? true,
      employee_status,
      totvs_branch_code: 1,
      addresses: {
        create: {
          status: 200,
          type: address.addressType,
          country: address.countryName ?? 'BRASIL',
          state: address.stateAbbreviation,
          city: address.cityName,
          zip_code: address.cep,
          neighborhood: address.neighborhood,
          street: address.address,
          number: address.number ?? 0,
          complement: address.complement,
          ibge_city_code: address.ibgeCityCode,
          bcb_country_code: address.bcbCountryCode,
        },
      },
      phones: {
        create: {
          status: 200,
          type: 'COMERCIAL',
          ddd_code: phone_number,
          number: phone_number,
        },
      },
    })

    return { user }
  }
}
