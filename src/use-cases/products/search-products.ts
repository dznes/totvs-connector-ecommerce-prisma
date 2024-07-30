import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'

interface SearchProductsUseCaseRequest {
  query: string
  page: number
  perPage: number
}

export interface SearchProductsUseCaseResponse {
  products: Product[]
  count: number
  totalPages: number
}

export class SearchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchProductsUseCaseRequest): Promise<SearchProductsUseCaseResponse> {
    const products = await this.productsRepository.searchMany(
      query,
      page,
      perPage,
    )
    const count = await this.productsRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      products,
      count,
      totalPages,
    }
  }
}
