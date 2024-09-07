import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { ListPhonesUseCase } from '@/use-cases/phones/list-phones'

export function makeListPhonesUseCase() {
  const categoryRepository = new PrismaPhonesRepository()
  const listPhonesUseCase = new ListPhonesUseCase(categoryRepository)

  return listPhonesUseCase
}
