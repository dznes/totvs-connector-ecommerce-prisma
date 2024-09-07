import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { UpdatePhoneUseCase } from '@/use-cases/phones/update-phone'

export function makeUpdatePhoneUseCase() {
  const phoneRepository = new PrismaPhonesRepository()
  const updatePhoneUseCase = new UpdatePhoneUseCase(phoneRepository)

  return updatePhoneUseCase
}
