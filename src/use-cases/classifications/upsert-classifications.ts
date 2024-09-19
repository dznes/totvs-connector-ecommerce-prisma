import { Slug } from '@/core/entities/value-objects/slug'
import { ClassificationsRepository } from '@/repositories/classifications-repository'

interface UpsertClassificationUseCaseRequest {
  code: string
  type_code: string
  type_name: string
  status: number
  title: string
  slug?: string
}

export class UpsertClassificationUseCase {
  constructor(
    private classificationsRepository: ClassificationsRepository,
  ) {}

  async execute({
    code,
    type_code,
    type_name,
    status,
    title,
    slug,
  }: UpsertClassificationUseCaseRequest) {

    const classification = await this.classificationsRepository.findByCodeAndTypeCode(code, type_code)

    if (classification) {
      await this.classificationsRepository.update({
        ...classification,
        status: status || classification.status,
        title: title || classification.title,
        slug: Slug.createFromText(title + code).value,
        type_code: type_code || classification.type_code,
        type_name: type_name || classification.type_name,
        updated_at: new Date(),
      })
    } else {
      await this.classificationsRepository.create({
        code,
        status,
        title,
        slug: slug ?? Slug.createFromText(title + code).value,
        type_code,
        type_name,
      })
    }
  }
}
