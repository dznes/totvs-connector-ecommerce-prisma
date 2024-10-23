import { PrismaClassificationsRepository } from '@/repositories/prisma/prisma-classifications-repository'
import { ListClassificationsUseCase } from '@/use-cases/classifications/list-classifications'

export function makeListClassificationsUseCase() {
  const classificationRepository = new PrismaClassificationsRepository()
  const listClassificationsUseCase = new ListClassificationsUseCase(
    classificationRepository,
  )

  return listClassificationsUseCase
}
