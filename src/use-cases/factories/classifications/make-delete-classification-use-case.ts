import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { DeleteClassificationUseCase } from '@/use-cases/classifications/delete-classification'

export function makeDeleteClassificationUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const deleteClassificationUseCase = new DeleteClassificationUseCase(classificationRepository)

  return deleteClassificationUseCase
}
