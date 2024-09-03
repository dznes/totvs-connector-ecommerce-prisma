import {
  CategoriesRepository,
} from '@/repositories/categories-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ProductsRepository, ProductWithSkuAndVariants } from '@/repositories/products-repository'

interface SearchProductsByCategorySlugUseCaseRequest {
  categorySlug: string
  query: string
  page: number
  perPage: number
}

interface SearchProductsByCategorySlugUseCaseResponse {
  products: ProductWithSkuAndVariants[]
  count: number
  totalPages: number
}

export class SearchProductsByCategorySlugUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    categorySlug,
    query,
    page,
    perPage,
  }: SearchProductsByCategorySlugUseCaseRequest): Promise<SearchProductsByCategorySlugUseCaseResponse> {
    const category = await this.categoriesRepository.findBySlug(categorySlug)

    if (!category) {
      throw new ResourceNotFoundError()
    }
    const products = await this.productsRepository.searchProductsByCategoryId(
      category.id,
      query,
      page,
      perPage,
    )

    const count = await this.productsRepository.countProductsByCategoryId(
      category.id,
    )
    const totalPages = Math.ceil(count / perPage)

    return { products, count, totalPages }
  }
}
