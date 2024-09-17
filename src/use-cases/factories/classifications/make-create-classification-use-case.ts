import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { CreateClassificationUseCase } from '@/use-cases/classifications/create-classification'

export function makeCreateClassificationUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const createClassificationUseCase = new CreateClassificationUseCase(classificationRepository)

  return createClassificationUseCase
}
