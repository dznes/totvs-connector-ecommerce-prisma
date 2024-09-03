import {
  CategoriesRepository,
  CategoryWithProducts,
} from '@/repositories/categories-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetCategoryBySlugUseCaseRequest {
  slug: string
}

interface GetCategoryBySlugUseCaseResponse {
  category: CategoryWithProducts
}

export class GetCategoryBySlugUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    slug,
  }: GetCategoryBySlugUseCaseRequest): Promise<GetCategoryBySlugUseCaseResponse> {
    const category = await this.categoriesRepository.findBySlug(slug)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    return { category }
  }
}
