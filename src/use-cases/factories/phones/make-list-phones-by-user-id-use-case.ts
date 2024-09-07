import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { ListPhonesByUserIdUseCase } from '@/use-cases/phones/list-phones-by-user-id'

export function makeListPhonesByUserIdUseCase() {
  const PhonesRepository = new PrismaPhonesRepository()
  const listPhonesByIdUserUseCase = new ListPhonesByUserIdUseCase(
    PhonesRepository,
  )

  return listPhonesByIdUserUseCase
}
