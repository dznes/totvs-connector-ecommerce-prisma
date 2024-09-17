import { ClassificationsRepository } from '@/repositories/classifications-repository'
import { Classification } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListClassificationsUseCaseResponse {
  classification: Classification[]
}

export class ListClassificationsUseCase {
  constructor(private classificationsRepository: ClassificationsRepository) {}

  async execute(): Promise<ListClassificationsUseCaseResponse> {
    const classification = await this.classificationsRepository.list()

    if (!classification) {
      throw new ResourceNotFoundError()
    }

    return { classification }
  }
}
