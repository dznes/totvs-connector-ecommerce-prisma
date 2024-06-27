import { PrismaColorsRepository } from '@/repositories/prisma/prisma-colors-repository'
import { UpsertColorUseCase } from '../../colors/upsert-colors'

export function makeUpsertColorUseCase() {
  const colorRepository = new PrismaColorsRepository()
  const upsertColorUseCase = new UpsertColorUseCase(colorRepository)

  return upsertColorUseCase
}
