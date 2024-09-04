import { PrismaColorsRepository } from '@/repositories/prisma/prisma-colors-repository'
import { UpdateColorsUseCase } from '@/use-cases/colors/update-color'

export function makeUpdateColorsUseCase() {
  const colorsRepository = new PrismaColorsRepository()
  const useCase = new UpdateColorsUseCase(colorsRepository)

  return useCase
}
