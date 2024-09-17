import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { GetClassificationBySlugUseCase } from '@/use-cases/classifications/get-classification-by-slug'

export function makeGetClassificationBySlugUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const getClassificationBySlugUseCase = new GetClassificationBySlugUseCase(
    classificationRepository,
  )

  return getClassificationBySlugUseCase
}
