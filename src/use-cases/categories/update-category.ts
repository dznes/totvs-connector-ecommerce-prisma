import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Slug } from '@/core/entities/value-objects/slug'

export interface UpdateCategoryUseCaseRequest {
  id: number
  status?: number
  title?: string
  slug?: string
}

export interface UpdateCategoryUseCaseResponse {
  category: Category
}

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    id,
    status,
    title,
    slug,
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new ResourceNotFoundError()
    }
    if (status) {
      category.status = status
    }
    if (title) {
      category.title = title
      category.slug = Slug.createFromText(title).value
    }
    if (slug) {
      category.slug = slug
    }

    category.updated_at = new Date()

    await this.categoriesRepository.update(category)

    return {
      category,
    }
  }
}
