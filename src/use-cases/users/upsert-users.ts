import { UsersRepository } from '@/repositories/users-repository'
import { Address, Phone } from '@/http/lib/totvs/interfaces/user-info'

interface UpsertUsersUseCaseRequest {
  id?: string
  code: string
  status: number
  name: string
  email: string
  phone: Phone
  regitered_at: Date
  rg: string | null
  birthDate: string | null
  address: Address
  cpf: string | null
  cnpj: string | null
  gender: string | null
  is_customer: boolean | null
  is_supplier: boolean | null
  is_representative: boolean | null
  is_shipping_company: boolean | null
  is_employee: boolean | null
  is_active: boolean | null
  employee_status: string | null
  totvs_branch_code: number
}

export class UpsertUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    code,
    status,
    name,
    email,
    phone,
    regitered_at,
    rg,
    birthDate,
    address,
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
    totvs_branch_code, // Typecasting from number to string
  }: UpsertUsersUseCaseRequest) {
    const user = await this.usersRepository.findByCode(code)

    if (user) {
      await this.usersRepository.update({
        ...user,
        updated_at: new Date(),
      })
      console.log(`Sku ${name} updated.`)
    } else if (address && phone) {
      await this.usersRepository.create({
        code,
        status,
        name,
        email,
        regitered_at,
        rg,
        birthDate: birthDate ?? null,
        cpf,
        cnpj,
        gender,
        is_customer: is_customer ?? false,
        is_supplier: is_supplier ?? false,
        is_representative: is_representative ?? false,
        is_shipping_company: is_shipping_company ?? false,
        is_employee: is_employee ?? false,
        is_active: is_active ?? true,
        employee_status,
        totvs_branch_code,
        addresses: {
          create: {
            status: 200,
            type: address.addressType,
            country: address.contryName ?? 'BRASIL',
            state: address.stateAbbreviation,
            city: address.cityName,
            zip_code: address.cep,
            neighborhood: address.neiborhood,
            street: address.address,
            number: address.addressNumber ?? 0,
            complement: address.complement,
            ibge_city_code: address.ibgeCityCode,
            bcb_country_code: address.bcbCountryCode,
          },
        },
        phones: {
          create: {
            status: 200,
            type: phone.typeName,
            ddd_code: phone.number,
            number: phone.number,
          },
        },
      })
      console.log(`Sku ${name} created.`)
    } else if (phone){
      await this.usersRepository.create({
        code,
        status,
        name,
        email,
        regitered_at,
        rg,
        birthDate: birthDate ?? null,
        cpf,
        cnpj,
        gender,
        is_customer: is_customer ?? false,
        is_supplier: is_supplier ?? false,
        is_representative: is_representative ?? false,
        is_shipping_company: is_shipping_company ?? false,
        is_employee: is_employee ?? false,
        is_active: is_active ?? true,
        employee_status,
        totvs_branch_code,
        phones: {
          create: {
            status: 200,
            type: phone.typeName,
            ddd_code: phone.number,
            number: phone.number,
          },
        },
      })
    } else {
      await this.usersRepository.create({
        code,
        status,
        name,
        email,
        regitered_at,
        rg,
        birthDate: birthDate ?? null,
        cpf,
        cnpj,
        gender,
        is_customer: is_customer ?? false,
        is_supplier: is_supplier ?? false,
        is_representative: is_representative ?? false,
        is_shipping_company: is_shipping_company ?? false,
        is_employee: is_employee ?? false,
        is_active: is_active ?? true,
        employee_status,
        totvs_branch_code,
      })
    }
  }
}
