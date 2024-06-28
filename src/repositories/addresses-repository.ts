import { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
  findById(id: string): Promise<Address | null>
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
  list(): Promise<Address[] | null>
  listByUserId(userId: string): Promise<Address[] | null>
  listByUserCode(userCode: string): Promise<Address[] | null>
  update(address: Address): Promise<void>
  delete(address: Address): Promise<void>
}
