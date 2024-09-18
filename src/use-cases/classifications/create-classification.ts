import { randomUUID } from 'node:crypto'

import { ClassificationsRepository } from '@/repositories/classifications-repository'
import { Classification } from '@prisma/client'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { Slug } from '@/core/entities/value-objects/slug'

interface CreateClassificationUseCaseRequest {
  code?: string
  type_code: string
  type_name: string
  status: number
  title: string
  slug?: string
}

interface CreateClassificationUseCaseResponse {
  classification: Classification
}

export class CreateClassificationUseCase {
  constructor(private classificationsRepository: ClassificationsRepository) {}

  async execute({
    code,
    type_code,
    type_name,
    status,
    title,
    slug,
  }: CreateClassificationUseCaseRequest): Promise<CreateClassificationUseCaseResponse> {
    if (!code) {
      code = randomUUID()
    }

    const classificationWithSameCode =
      await this.classificationsRepository.findByCode(code)

    if (classificationWithSameCode) {
      throw new ResourceAlreadyExistsError()
    }

    const systemSlug = Slug.createFromText(title).value

    const classification = await this.classificationsRepository.create({
      code,
      type_code,
      type_name,
      status,
      title,
      slug: slug ?? systemSlug,
    })

    return { classification }
  }
}
