import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { DeletePhoneUseCase } from '@/use-cases/phones/delete-phone'

export function makeDeletePhoneUseCase() {
  const phoneRepository = new PrismaPhonesRepository()
  const deletePhoneUseCase = new DeletePhoneUseCase(phoneRepository)

  return deletePhoneUseCase
}
