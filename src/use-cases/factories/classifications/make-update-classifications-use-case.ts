import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { UpdateClassificationUseCase } from '@/use-cases/classifications/update-classification'

export function makeUpdateClassificationUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const updateClassificationUseCase = new UpdateClassificationUseCase(
    classificationRepository,
  )

  return updateClassificationUseCase
}
