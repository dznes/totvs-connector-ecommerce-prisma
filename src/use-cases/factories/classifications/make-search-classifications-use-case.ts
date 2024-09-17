import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { SearchClassificationsUseCase } from '@/use-cases/classifications/search-classifications'

export function makeSearchClassificationsUseCase() {
  const classificationsRepository = new PrismaClassificationsRepository()
  const useCase = new SearchClassificationsUseCase(classificationsRepository)

  return useCase
}
