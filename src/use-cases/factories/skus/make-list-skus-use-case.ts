import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { ListSkusUseCase } from '@/use-cases/skus/list-skus'

export function makeListSkusUseCase() {
  const categoryRepository = new PrismaSkusRepository()
  const listSkusUseCase = new ListSkusUseCase(categoryRepository)

  return listSkusUseCase
}
