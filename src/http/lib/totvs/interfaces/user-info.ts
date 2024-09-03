export interface Address {
  addressTypeCode: number
  addressType: string
  address: string
  addressNumber: number | null
  complement: string | null
  neighborhood: string | null
  ibgeCityCode: number
  cityName: string
  stateAbbreviation: string
  cep: string
  bcbCountryCode: number
  countryName: string
}

export interface Phone {
  typeCode: number
  typeName: string
  number: string
  isDefault: boolean
}

interface Email {
  typeName: string
  email: string
}

export interface User {
  code: string
  name: string
  cpf: string | null
  cnpj: string | null
  rg: string | null
  gender: string | null
  birthDate: string | null
  nationality: string | null
  homeTown: string | null
  registrationStatus?: string
  isCustumer: boolean
  isSupplier: boolean
  isRepresentative: boolean
  isShippingCompany: boolean
  insertDate: Date
  isEmployee: boolean
  isInactive: boolean
  isBloqued?: boolean
  isCustomer?: boolean
  isPurchasingGuide?: boolean
  employeeStatus: string | null
  customerStatus: string | null
  branchInsertCode: number
  addresses: Address[]
  phones: Phone[]
  emails: Email[]
}

export interface CreateUserAddress {
  addressType: string
  address: string
  number: number
  complement?: string | null
  neighborhood: string | null
  ibgeCityCode: number
  cityName: string
  stateAbbreviation: string
  cep: string
  bcbCountryCode: number
  countryName: string
}

export interface CreateUserRequest {
  token: string
  name: string
  cpf?: string
  cnpj?: string
  rg?: string
  gender?: string
  birthDate?: string
  nationality?: string
  homeTown?: string
  registrationStatus?: string
  isCustumer?: boolean
  isSupplier?: boolean
  isRepresentative?: boolean
  isShippingCompany?: boolean
  insertDate?: Date
  isEmployee?: boolean
  isInactive?: boolean
  isBloqued?: boolean
  isCustomer?: boolean
  isPurchasingGuide?: boolean
  employeeStatus?: string
  customerStatus?: string
  branchInsertCode?: number
  address: CreateUserAddress
  phoneNumber: string
  email: string
}
