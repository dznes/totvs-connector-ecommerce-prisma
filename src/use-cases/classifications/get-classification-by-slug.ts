import {
  ClassificationsRepository,
  ClassificationWithProducts,
} from '@/repositories/classifications-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetClassificationBySlugUseCaseRequest {
  slug: string
}

interface GetClassificationBySlugUseCaseResponse {
  classification: ClassificationWithProducts
}

export class GetClassificationBySlugUseCase {
  constructor(private classificationsRepository: ClassificationsRepository) {}

  async execute({
    slug,
  }: GetClassificationBySlugUseCaseRequest): Promise<GetClassificationBySlugUseCaseResponse> {
    const classification = await this.classificationsRepository.findBySlug(slug)

    if (!classification) {
      throw new ResourceNotFoundError()
    }

    return { classification }
  }
}
