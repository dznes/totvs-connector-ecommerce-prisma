import { PrismaColorsRepository } from '@/repositories/prisma/prisma-colors-repository'
import { SearchColorsUseCase } from '@/use-cases/colors/search-colors'

export function makeSearchColorsUseCase() {
  const colorsRepository = new PrismaColorsRepository()
  const useCase = new SearchColorsUseCase(colorsRepository)

  return useCase
}
