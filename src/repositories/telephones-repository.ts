import { Telephone, Prisma } from '@prisma/client'

export interface TelephonesRepository {
  findById(id: string): Promise<Telephone | null>
  create(data: Prisma.TelephoneUncheckedCreateInput): Promise<Telephone>
  list(): Promise<Telephone[] | null>
  listByUserId(userId: string): Promise<Telephone[] | null>
  listByUserCode(userCode: string): Promise<Telephone[] | null>
  update(telephone: Telephone): Promise<void>
  delete(telephone: Telephone): Promise<void>
}
