import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { ListClassificationsByTypeCodeUseCase } from '@/use-cases/classifications/list-classifications-by-type-code'

export function makeListClassificationsByTypeCodeUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const listClassificationsByTypeCodeUseCase = new ListClassificationsByTypeCodeUseCase(classificationRepository)

  return listClassificationsByTypeCodeUseCase
}
