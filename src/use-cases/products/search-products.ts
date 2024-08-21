import { ProductsRepository, ProductWithSkuAndVariants } from '@/repositories/products-repository'

interface SearchProductsUseCaseRequest {
  query: string
  productCode: string
  integrationCode: string
  productTitle: string
  page: number
  perPage: number
}

export interface SearchProductsUseCaseResponse {
  products: ProductWithSkuAndVariants [] 
  count: number
  totalPages: number
}

export class SearchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    query,
    productCode,
    integrationCode,
    productTitle,
    page,
    perPage,
  }: SearchProductsUseCaseRequest): Promise<SearchProductsUseCaseResponse> {
    const products = await this.productsRepository.searchMany(
      query,
      productCode,
      integrationCode,
      productTitle,
      page,
      perPage,
    )
    const count = await this.productsRepository.count(query, productCode, integrationCode, productTitle)
    const totalPages = Math.ceil(count / perPage)

    return {
      products,
      count,
      totalPages,
    }
  }
}
