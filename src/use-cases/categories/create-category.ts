import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { Slug } from '@/core/entities/value-objects/slug'

interface CreateCategoryUseCaseRequest {
  status: number
  title: string
  slug?: string
}

interface CreateCategoryUseCaseResponse {
  category: Category
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    status,
    title,
    slug,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const categoryWithSameTitle =
      await this.categoriesRepository.findByTitle(title)

    if (categoryWithSameTitle) {
      throw new ResourceAlreadyExistsError()
    }

    const systemSlug = Slug.createFromText(title).value

    const category = await this.categoriesRepository.create({
      status,
      title,
      slug: slug ?? systemSlug,
    })

    return { category }
  }
}
