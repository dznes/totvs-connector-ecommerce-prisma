import { Phone, Prisma } from '@prisma/client'

export interface PhonesRepository {
  findById(id: string): Promise<Phone | null>
  create(data: Prisma.PhoneUncheckedCreateInput): Promise<Phone>
  list(): Promise<Phone[] | null>
  listByUserId(userId: string): Promise<Phone[] | null>
  listByUserCode(userCode: string): Promise<Phone[] | null>
  update(phone: Phone): Promise<void>
  delete(phone: Phone): Promise<void>
}
