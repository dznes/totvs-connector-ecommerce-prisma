import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { UpsertClassificationUseCase } from '@/use-cases/classifications/upsert-classifications'

export function makeUpsertClassificationUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const upsertClassificationUseCase = new UpsertClassificationUseCase(classificationRepository)

  return upsertClassificationUseCase
}
