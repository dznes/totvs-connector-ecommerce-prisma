import { ClassificationsRepository } from '@/repositories/classifications-repository'
import { Classification } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Slug } from '@/core/entities/value-objects/slug'

export interface UpdateClassificationUseCaseRequest {
  id: number
  status?: number
  title?: string
  slug?: string
}

export interface UpdateClassificationUseCaseResponse {
  classification: Classification
}

export class UpdateClassificationUseCase {
  constructor(private classificationsRepository: ClassificationsRepository) {}

  async execute({
    id,
    status,
    title,
    slug,
  }: UpdateClassificationUseCaseRequest): Promise<UpdateClassificationUseCaseResponse> {
    const classification = await this.classificationsRepository.findById(id)

    if (!classification) {
      throw new ResourceNotFoundError()
    }
    if (status) {
      classification.status = status
    }
    if (title) {
      classification.title = title
      classification.slug = Slug.createFromText(title).value
    }
    if (slug) {
      classification.slug = slug
    }

    classification.updated_at = new Date()

    await this.classificationsRepository.update(classification)

    return {
      classification,
    }
  }
}
