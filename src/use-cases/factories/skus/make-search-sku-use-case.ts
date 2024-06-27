import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { SearchSkusUseCase } from '@/use-cases/skus/search-skus'

export function makeSearchSkusUseCase() {
  const skusRepository = new PrismaSkusRepository()
  const useCase = new SearchSkusUseCase(skusRepository)

  return useCase
}
