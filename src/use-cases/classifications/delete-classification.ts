import { ClassificationsRepository } from '@/repositories/classifications-repository'
import { Classification } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface DeleteClassificationUseCaseRequest {
  id: number
}

export interface DeleteClassificationUseCaseResponse {
  classification: Classification
}

export class DeleteClassificationUseCase {
  constructor(private classificationsRepository: ClassificationsRepository) {}

  async execute({
    id,
  }: DeleteClassificationUseCaseRequest): Promise<DeleteClassificationUseCaseResponse> {
    const classification = await this.classificationsRepository.findById(id)

    if (!classification) {
      throw new ResourceNotFoundError()
    }

    await this.classificationsRepository.delete(classification)

    return {
      classification,
    }
  }
}
