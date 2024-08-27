import { CategoriesRepository, CategoryWithProducts } from '@/repositories/categories-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetCategoryBySlugUseCaseRequest {
  slug: string
}

interface GetCategoryBySlugUseCaseResponse {
  category: CategoryWithProducts
}

export class ListProductsByCategorySlug {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    slug,
  }: GetCategoryBySlugUseCaseRequest): Promise<GetCategoryBySlugUseCaseResponse> {
    const category = await this.categoriesRepository.listProductsByCategorySlug(slug)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    return { category }
  }
}
