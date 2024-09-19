import { ClassificationsRepository } from '@/repositories/classifications-repository'
import { Classification } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListClassificationsByTypeCodeUseCaseRequest {
  typeCode: string
}

interface ListClassificationsByTypeCodeUseCaseResponse {
  classifications: Classification[]
}

export class ListClassificationsByTypeCodeUseCase {
  constructor(private classificationsRepository: ClassificationsRepository) {}

  async execute({ typeCode }: ListClassificationsByTypeCodeUseCaseRequest): Promise<ListClassificationsByTypeCodeUseCaseResponse> {
    const classifications = await this.classificationsRepository.listByTypeCode(typeCode)

    if (!classifications) {
      throw new ResourceNotFoundError()
    }

    return { classifications }
  }
}
