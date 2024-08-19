import { PrismaSkusRepository } from '@/repositories/prisma/prisma-skus-repository'
import { SearchMaterialSkusUseCase } from '@/use-cases/skus/search-material-skus'

export function makeSearchMaterialSkusUseCase() {
  const skusRepository = new PrismaSkusRepository()
  const useCase = new SearchMaterialSkusUseCase(skusRepository)

  return useCase
}
