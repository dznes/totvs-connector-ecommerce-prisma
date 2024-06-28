export interface Address {
  addressType: string
  address: string
  addressNumber: number
  complement: string | null
  neiborhood: string | null
  ibgeCityCode: number
  cityName: string
  stateAbbreviation: string
  cep: string
  bcbCountryCode: number
  contryName: string
}

interface Phone {
  typeName: string
  number: string
}

interface Email {
  typeName: string
  email: string
}

export interface User {
  code: string
  name: string
  cpf: string
  rg: string | null
  gender: string | null
  birthDate: Date | null
  isCostumer: boolean
  isSupplier: boolean
  isRepresentative: boolean
  isShippingCompany: boolean
  insertDate: Date
  isEmployee: boolean
  employeeStatus: string | null
  customerStatus: string | null
  branchInsertCode: number
  addresses: Address[]
  phones: Phone[]
  emails: Email[]
}
